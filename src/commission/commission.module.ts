import { Module } from '@nestjs/common';
import { CommissionService } from './commission.service';
import { CommissionController } from './commission.controller';

@Module({
  providers: [CommissionService],
  controllers: [CommissionController],
})
export class CommissionModule {}
