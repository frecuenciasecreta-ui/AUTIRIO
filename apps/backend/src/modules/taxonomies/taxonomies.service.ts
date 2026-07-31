import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../cache/redis.service';

@Injectable()
export class TaxonomiesService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  // Brands
  async getBrands() {
    const cacheKey = 'taxonomies:brands';
    const cached = await this.redis.get<any>(cacheKey);
    if (cached) return cached;

    const data = await this.prisma.brand.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { vehicles: true },
        },
      },
    });

    await this.redis.set(cacheKey, data, 86400); // 24 hours
    return data;
  }

  async createBrand(name: string, logoUrl?: string, isPopular = false) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const existing = await this.prisma.brand.findUnique({ where: { slug } });
    if (existing) {
      throw new BadRequestException('La marca ya existe');
    }
    const result = await this.prisma.brand.create({
      data: { name, slug, logoUrl, isPopular },
    });
    
    await this.redis.deletePattern('taxonomies:brands*');
    return result;
  }

  // Models
  async getModelsByBrand(brandId?: string) {
    const cacheKey = `taxonomies:models:${brandId || 'all'}`;
    const cached = await this.redis.get<any>(cacheKey);
    if (cached) return cached;

    const data = await this.prisma.model.findMany({
      where: brandId ? { brandId } : {},
      orderBy: { name: 'asc' },
      include: { brand: true },
    });

    await this.redis.set(cacheKey, data, 86400);
    return data;
  }

  async createModel(brandId: string, name: string, bodyType?: string) {
    const slug = `${brandId}-${name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const result = await this.prisma.model.create({
      data: { brandId, name, slug, bodyType },
    });

    await this.redis.deletePattern('taxonomies:models*');
    return result;
  }

  // DGT Eco Labels & Fuel Types
  async getDgtEcoLabels() {
    const cacheKey = 'taxonomies:ecolabels';
    const cached = await this.redis.get<any>(cacheKey);
    if (cached) return cached;

    const data = await this.prisma.dgtEcoLabel.findMany();
    await this.redis.set(cacheKey, data, 86400 * 30); // 30 days
    return data;
  }

  async getFuelTypes() {
    const cacheKey = 'taxonomies:fueltypes';
    const cached = await this.redis.get<any>(cacheKey);
    if (cached) return cached;

    const data = await this.prisma.fuelType.findMany();
    await this.redis.set(cacheKey, data, 86400 * 30); // 30 days
    return data;
  }
}
