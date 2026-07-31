import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import * as sanitizeHtml from 'sanitize-html';

export type LeadType = string;
export type LeadStatus = string;

  private readonly logger = new Logger(LeadsService.name);

  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) {}

  async createPublicLead(data: {
    type?: LeadType;
    name: string;
    companyName?: string;
    email: string;
    phone: string;
    whatsapp?: string;
    province: string;
    approxVehicles?: string;
    businessType?: string;
    vehicleId?: string;
    message: string;
  }) {
    if (!data.name || !data.email || !data.phone || !data.province || !data.message) {
      throw new BadRequestException('Por favor, completa todos los campos requeridos');
    }

    const cleanMessage = sanitizeHtml(data.message, { allowedTags: [], allowedAttributes: {} });

    const lead = await this.prisma.leadRequest.create({
      data: {
        type: data.type || 'B2B_PARTNER_REQUEST',
        name: data.name,
        companyName: data.companyName,
        email: data.email,
        phone: data.phone,
        whatsapp: data.whatsapp,
        province: data.province,
        approxVehicles: data.approxVehicles,
        businessType: data.businessType,
        vehicleId: data.vehicleId,
        message: cleanMessage,
        status: 'NEW',
      },
    });

    // Send email notification (non-blocking)
    this.mailerService
      .sendMail({
        to: 'ventas@automaestro.es', // Sales team
        subject: `Nuevo Lead Autirio: ${data.name} (${data.type || 'B2B'})`,
        html: `
          <h3>Nueva solicitud de contacto</h3>
          <p><strong>Nombre:</strong> ${data.name}</p>
          <p><strong>Teléfono:</strong> ${data.phone}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Provincia:</strong> ${data.province}</p>
          <p><strong>Empresa:</strong> ${data.companyName || 'N/A'}</p>
          <hr/>
          <p><strong>Mensaje:</strong></p>
          <p>${cleanMessage}</p>
        `,
      })
      .catch((err) => {
        this.logger.error(`Failed to send lead email: ${err.message}`, err.stack);
      });

    return lead;
  }

  async findAllAdmin(status?: LeadStatus) {
    return this.prisma.leadRequest.findMany({
      where: status ? { status } : {},
      orderBy: { createdAt: 'desc' },
      include: {
        vehicle: {
          select: { id: true, title: true, slug: true },
        },
      },
    });
  }

  async updateStatus(id: string, status: LeadStatus, notes?: string) {
    return this.prisma.leadRequest.update({
      where: { id },
      data: {
        status,
        notes: notes ? sanitizeHtml(notes, { allowedTags: [] }) : undefined,
      },
    });
  }
}
