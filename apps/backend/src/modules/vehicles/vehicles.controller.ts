import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehicleFilterQueryDto } from './dto/vehicle-query.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get('public')
  findAllPublic(@Query() query: VehicleFilterQueryDto) {
    return this.vehiclesService.findAllPublic(query);
  }

  @Get('public/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.vehiclesService.findBySlug(slug);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('admin/all')
  findAllAdmin() {
    return this.vehiclesService.findAllAdmin();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('admin')
  create(@Body() body: any) {
    return this.vehiclesService.create(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('admin/:id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.vehiclesService.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('admin/:id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(id);
  }
}
