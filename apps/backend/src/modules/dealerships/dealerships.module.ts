import { Module } from '@nestjs/common';
import { DealershipsService } from './dealerships.service';
import { DealershipsController } from './dealerships.controller';

@Module({
  controllers: [DealershipsController],
  providers: [DealershipsService],
  exports: [DealershipsService],
})
export class DealershipsModule {}
