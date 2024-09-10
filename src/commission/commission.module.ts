import { Module } from '@nestjs/common';
import CommissionController from './commission.controller';
import CommissionService from './commission.service';
import FileReaderService from './file-reader.service';

@Module({
  providers: [CommissionService, FileReaderService],
  controllers: [CommissionController],
})
export default class CommissionModule {}
