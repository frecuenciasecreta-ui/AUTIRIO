import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('public')
  findAllPublic() {
    return this.blogService.findAllPublic();
  }

  @Get('public/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.blogService.findBySlug(slug);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('admin/all')
  findAllAdmin() {
    return this.blogService.findAllAdmin();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('admin')
  create(@Body() body: any) {
    return this.blogService.create(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('admin/:id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.blogService.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('admin/:id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
