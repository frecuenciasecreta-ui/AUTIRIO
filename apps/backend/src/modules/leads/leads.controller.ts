import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post('public')
  createPublicLead(@Body() body: any) {
    return this.leadsService.createPublicLead(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('admin/all')
  findAllAdmin(@Query('status') status?: string) {
    return this.leadsService.findAllAdmin(status);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('admin/:id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: string; notes?: string }) {
    return this.leadsService.updateStatus(id, body.status, body.notes);
  }
}
