import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);
  private client: Redis | null = null;
  private readonly enabled: boolean;

  constructor(private configService: ConfigService) {
    const redisUrl = this.configService.get<string>('REDIS_URL');
    this.enabled = !!redisUrl;

    if (this.enabled) {
      try {
        this.client = new Redis(redisUrl, {
          tls: redisUrl.includes('upstash') ? { rejectUnauthorized: false } : undefined,
          maxRetriesPerRequest: 3,
        });

        this.client.on('error', (err) => {
          this.logger.error(`Redis Error: ${err.message}`);
        });

        this.logger.log('Redis connected successfully (Upstash Ready)');
      } catch (error) {
        this.logger.error('Failed to initialize Redis client', error);
        this.enabled = false;
      }
    } else {
      this.logger.warn('REDIS_URL not set. Caching is disabled. To enable cache, set the REDIS_URL in .env');
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.enabled || !this.client) return null;
    try {
      const value = await this.client.get(key);
      if (!value) return null;
      return JSON.parse(value) as T;
    } catch (error) {
      this.logger.error(`Cache Get Error (${key}): ${error.message}`);
      return null;
    }
  }

  async set(key: string, value: any, ttlSeconds = 3600): Promise<void> {
    if (!this.enabled || !this.client) return;
    try {
      await this.client.setex(key, ttlSeconds, JSON.stringify(value));
    } catch (error) {
      this.logger.error(`Cache Set Error (${key}): ${error.message}`);
    }
  }

  async deletePattern(pattern: string): Promise<void> {
    if (!this.enabled || !this.client) return;
    try {
      // Find all keys matching pattern and delete them
      // In production with huge dbs, use SCAN instead of KEYS
      const keys = await this.client.keys(pattern);
      if (keys.length > 0) {
        await this.client.del(...keys);
        this.logger.log(`Purged ${keys.length} cache keys matching pattern: ${pattern}`);
      }
    } catch (error) {
      this.logger.error(`Cache Delete Pattern Error (${pattern}): ${error.message}`);
    }
  }
}
