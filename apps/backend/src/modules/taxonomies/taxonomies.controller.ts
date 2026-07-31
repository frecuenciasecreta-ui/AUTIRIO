import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { TaxonomiesService } from './taxonomies.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('taxonomies')
export class TaxonomiesController {
  constructor(private readonly taxonomiesService: TaxonomiesService) {}

  @Get('brands')
  getBrands() {
    return this.taxonomiesService.getBrands();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('brands')
  createBrand(@Body() body: { name: string; logoUrl?: string; isPopular?: boolean }) {
    return this.taxonomiesService.createBrand(body.name, body.logoUrl, body.isPopular);
  }

  @Get('models')
  getModels(@Query('brandId') brandId?: string) {
    return this.taxonomiesService.getModelsByBrand(brandId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('models')
  createModel(@Body() body: { brandId: string; name: string; bodyType?: string }) {
    return this.taxonomiesService.createModel(body.brandId, body.name, body.bodyType);
  }

  @Get('dgt-labels')
  getDgtLabels() {
    return this.taxonomiesService.getDgtEcoLabels();
  }

  @Get('fuel-types')
  getFuelTypes() {
    return this.taxonomiesService.getFuelTypes();
  }
}
