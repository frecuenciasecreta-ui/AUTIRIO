import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Get('public/active')
  getActivePublicScripts() {
    return this.trackingService.getActivePublicScripts();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('admin/all')
  getAllAdmin() {
    return this.trackingService.getAllAdmin();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('admin/:provider')
  updateScriptConfig(
    @Param('provider') provider: string,
    @Body() body: { trackingId?: string; apiSecret?: string; isActive?: boolean; customScriptHtml?: string },
  ) {
    return this.trackingService.updateScriptConfig(provider, body);
  }
}
