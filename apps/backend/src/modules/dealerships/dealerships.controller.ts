import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { DealershipsService } from './dealerships.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('dealerships')
export class DealershipsController {
  constructor(private readonly dealershipsService: DealershipsService) {}

  @Get('public')
  findAllPublic() {
    return this.dealershipsService.findAllPublic();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('admin/all')
  findAllAdmin() {
    return this.dealershipsService.findAllAdmin();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('admin')
  create(@Body() body: any) {
    return this.dealershipsService.create(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('admin/:id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.dealershipsService.update(id, body);
  }
}
