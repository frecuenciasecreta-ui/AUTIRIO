import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdsService {
  constructor(private prisma: PrismaService) {}

  async getActiveAdForPlacement(placementCode: string, ipAddress?: string, userAgent?: string) {
    const placement = await this.prisma.adPlacement.findUnique({
      where: { code: placementCode },
    });

    if (!placement) return null;

    const now = new Date();
    const activeCampaigns = await this.prisma.adCampaign.findMany({
      where: {
        placementId: placement.id,
        isActive: true,
        startDate: { lte: now },
        endDate: { gte: now },
      },
      orderBy: { priority: 'desc' },
    });

    if (activeCampaigns.length === 0) return null;

    const campaign = activeCampaigns[0];

    // Asynchronously log impression
    this.prisma.adImpressionLog.create({
      data: {
        campaignId: campaign.id,
        ipAddress: ipAddress || '127.0.0.1',
        userAgent: userAgent || 'Unknown',
      },
    }).catch(() => {});

    await this.prisma.adCampaign.update({
      where: { id: campaign.id },
      data: { impressionsCount: { increment: 1 } },
    });

    return campaign;
  }

  async recordClick(campaignId: string, ipAddress?: string, userAgent?: string) {
    const campaign = await this.prisma.adCampaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) {
      throw new NotFoundException('Campaña no encontrada');
    }

    await Promise.all([
      this.prisma.adClickLog.create({
        data: {
          campaignId,
          ipAddress: ipAddress || '127.0.0.1',
          userAgent: userAgent || 'Unknown',
        },
      }),
      this.prisma.adCampaign.update({
        where: { id: campaignId },
        data: { clicksCount: { increment: 1 } },
      }),
    ]);

    return { targetUrl: campaign.targetUrl };
  }

  async findAllAdmin() {
    const campaigns = await this.prisma.adCampaign.findMany({
      orderBy: { createdAt: 'desc' },
      include: { placement: true },
    });

    return campaigns.map((c) => {
      const ctr = c.impressionsCount > 0 ? ((c.clicksCount / c.impressionsCount) * 100).toFixed(2) : '0.00';
      return {
        ...c,
        ctr: `${ctr}%`,
      };
    });
  }

  async createCampaign(data: any) {
    return this.prisma.adCampaign.create({
      data: {
        name: data.name,
        placementId: data.placementId,
        type: data.type || 'IMAGE',
        imageUrl: data.imageUrl,
        targetUrl: data.targetUrl,
        customHtml: data.customHtml,
        adSenseSlotId: data.adSenseSlotId,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        priority: Number(data.priority) || 1,
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    });
  }

  async updateCampaign(id: string, data: any) {
    return this.prisma.adCampaign.update({
      where: { id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      },
    });
  }

  async getPlacements() {
    return this.prisma.adPlacement.findMany();
  }
}
