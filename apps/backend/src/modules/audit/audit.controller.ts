import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('admin/logs')
  getLogs(@Query('limit') limit?: number) {
    return this.auditService.getRecentLogs(Number(limit) || 50);
  }
}
