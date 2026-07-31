import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export type TrackingProvider = string;

@Injectable()
export class TrackingService {
  constructor(private prisma: PrismaService) {}

  async getActivePublicScripts() {
    return this.prisma.trackingScriptConfig.findMany({
      where: { isActive: true },
      select: {
        provider: true,
        trackingId: true,
        customScriptHtml: true,
      },
    });
  }

  async getAllAdmin() {
    return this.prisma.trackingScriptConfig.findMany({
      orderBy: { provider: 'asc' },
    });
  }

  async updateScriptConfig(provider: TrackingProvider, data: { trackingId?: string; apiSecret?: string; isActive?: boolean; customScriptHtml?: string }) {
    return this.prisma.trackingScriptConfig.upsert({
      where: { provider },
      update: data,
      create: {
        provider,
        trackingId: data.trackingId,
        apiSecret: data.apiSecret,
        isActive: data.isActive || false,
        customScriptHtml: data.customScriptHtml,
      },
    });
  }
}
