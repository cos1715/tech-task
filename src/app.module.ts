import { Module } from '@nestjs/common';
import CommissionModule from './commission/commission.module';

@Module({
  imports: [CommissionModule],
})
export default class AppModule {}
