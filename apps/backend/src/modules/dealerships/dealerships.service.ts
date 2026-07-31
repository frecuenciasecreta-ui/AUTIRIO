import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DealershipsService {
  constructor(private prisma: PrismaService) {}

  async findAllPublic() {
    return this.prisma.dealership.findMany({
      where: { isPartner: true },
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { vehicles: { where: { status: 'PUBLISHED' } } },
        },
      },
    });
  }

  async findAllAdmin() {
    return this.prisma.dealership.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { vehicles: true },
        },
      },
    });
  }

  async create(data: any) {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const existing = await this.prisma.dealership.findUnique({ where: { slug } });
    if (existing) {
      throw new BadRequestException('El concesionario ya existe');
    }
    return this.prisma.dealership.create({
      data: {
        ...data,
        slug,
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.dealership.update({
      where: { id },
      data,
    });
  }
}
