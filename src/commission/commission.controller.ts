import { Controller, Post, Body, Get } from '@nestjs/common';
import CommissionService from './commission.service';
import FileReaderService from './file-reader.service';
import { FeeDto } from './dto';

@Controller('commission')
class CommissionController {
  constructor(
    private readonly commissionService: CommissionService,
    private readonly fileReaderService: FileReaderService,
  ) {}

  @Get()
  getMockData() {
    return this.fileReaderService.readJsonFile();
  }

  @Post('/calculate')
  calculateFees(@Body() body: FeeDto[]) {
    return this.commissionService.calculateFees(body);
  }
}

export default CommissionController;
