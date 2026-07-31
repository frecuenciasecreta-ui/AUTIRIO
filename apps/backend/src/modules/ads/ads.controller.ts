import { Controller, Get, Post, Put, Body, Param, Req, UseGuards } from '@nestjs/common';
import { AdsService } from './ads.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Get('placement/:code')
  getActiveAd(@Param('code') code: string, @Req() req: Request) {
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    return this.adsService.getActiveAdForPlacement(code, ip, userAgent);
  }

  @Post('click/:campaignId')
  recordClick(@Param('campaignId') campaignId: string, @Req() req: Request) {
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    return this.adsService.recordClick(campaignId, ip, userAgent);
  }

  @Get('placements')
  getPlacements() {
    return this.adsService.getPlacements();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('admin/all')
  findAllAdmin() {
    return this.adsService.findAllAdmin();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('admin')
  createCampaign(@Body() body: any) {
    return this.adsService.createCampaign(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('admin/:id')
  updateCampaign(@Param('id') id: string, @Body() body: any) {
    return this.adsService.updateCampaign(id, body);
  }
}
