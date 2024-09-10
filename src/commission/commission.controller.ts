import { Controller, Post, Body, Get, Inject } from '@nestjs/common';
import PROVIDERS from 'src/const/providers';
import CommissionService from './commission.service';
import FileReaderService from './file-reader.service';
import { FeeDto } from './dto';

@Controller()
class CommissionController {
  constructor(
    private readonly commissionService: CommissionService,
    private readonly fileReaderService: FileReaderService,
    @Inject(PROVIDERS.FILE_PATH) private readonly filePath: string,
  ) {}

  @Get()
  getMockData() {
    const file = this.filePath;
    console.log('🚀 ~ CommissionController ~ getMockData ~ file==>>', file);
    return this.fileReaderService.readJsonFile();
  }

  @Post()
  calculateFees(@Body() body: FeeDto[]) {
    return this.commissionService.calculateFees(body);
  }
}

export default CommissionController;
