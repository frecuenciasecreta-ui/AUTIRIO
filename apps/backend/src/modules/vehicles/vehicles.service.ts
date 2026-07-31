import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { VehicleFilterQueryDto } from './dto/vehicle-query.dto';
import { RedisService } from '../cache/redis.service';

export type VehicleStatus = string;
export type TransmissionType = string;

export interface VehicleFilterQuery {
  brandId?: string;
  modelId?: string;
  fuelTypeId?: string;
  dgtEcoLabelId?: string;
  transmission?: TransmissionType;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  maxKm?: number;
  search?: string;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
  orderBy?: string;
}

@Injectable()
export class VehiclesService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  async findAllPublic(query: VehicleFilterQueryDto) {
    const {
      brandId,
      modelId,
      fuelTypeId,
      dgtEcoLabelId,
      transmission,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      maxKm,
      search,
      isFeatured,
      page = 1,
      limit = 20,
    } = query;

    // Cache key based on query string
    const cacheKey = `vehicles:public:${JSON.stringify(query)}`;
    const cached = await this.redis.get<any>(cacheKey);
    if (cached) return cached;

    const where: any = {
      status: 'PUBLISHED',
    };

    if (brandId) where.brandId = brandId;
    if (modelId) where.modelId = modelId;
    if (fuelTypeId) where.fuelTypeId = fuelTypeId;
    if (dgtEcoLabelId) where.dgtEcoLabelId = dgtEcoLabelId;
    if (transmission) where.transmission = transmission;
    if (isFeatured !== undefined) where.isFeatured = isFeatured;

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = minPrice;
      if (maxPrice) where.price.lte = maxPrice;
    }

    if (minYear || maxYear) {
      where.year = {};
      if (minYear) where.year.gte = minYear;
      if (maxYear) where.year.lte = maxYear;
    }

    if (maxKm) where.kilometers = { lte: maxKm };

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.vehicle.findMany({
        where,
        skip,
        take: limit,
        include: {
          brand: true,
          model: true,
          fuelType: true,
          dgtEcoLabel: true,
          dealership: true,
          images: {
            orderBy: { displayOrder: 'asc' },
          },
        },
      }),
      this.prisma.vehicle.count({ where }),
    ]);

    const result = {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };

    // Cache the result for 1 hour
    await this.redis.set(cacheKey, result, 3600);

    return result;
  }

  async findBySlug(slug: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { slug },
      include: {
        brand: true,
        model: true,
        version: true,
        fuelType: true,
        dgtEcoLabel: true,
        dealership: true,
        images: {
          orderBy: { displayOrder: 'asc' },
        },
      },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehículo no encontrado');
    }

    // Increment view count
    await this.prisma.vehicle.update({
      where: { id: vehicle.id },
      data: { viewCount: { increment: 1 } },
    });

    return vehicle;
  }

  async findAllAdmin() {
    return this.prisma.vehicle.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        brand: true,
        model: true,
        fuelType: true,
        dgtEcoLabel: true,
        dealership: true,
        images: true,
      },
    });
  }

  async create(data: any) {
    const baseSlug = `${data.title}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const { images, ...vehicleData } = data;

    const result = await this.prisma.vehicle.create({
      data: {
        ...vehicleData,
        slug,
        images: images && images.length > 0 ? {
          create: images.map((img: any, idx: number) => ({
            url: img.url,
            alt: img.alt || data.title,
            isMain: idx === 0,
            displayOrder: idx + 1,
          })),
        } : undefined,
      },
      include: {
        images: true,
        brand: true,
        model: true,
      },
    });

    await this.redis.deletePattern('vehicles:public:*');
    return result;
  }

  async update(id: string, data: any) {
    const { images, ...vehicleData } = data;
    const result = await this.prisma.vehicle.update({
      where: { id },
      data: vehicleData,
      include: { images: true },
    });
    
    await this.redis.deletePattern('vehicles:public:*');
    return result;
  }

  async remove(id: string) {
    const result = await this.prisma.vehicle.delete({
      where: { id },
    });

    await this.redis.deletePattern('vehicles:public:*');
    return result;
  }
}
