import { Controller, Post, Body, Get, Inject, HttpCode } from '@nestjs/common';
import PROVIDERS from '../const/providers';
import CommissionService from './service/commission.service';
import FileReaderService from './service/file-reader.service';
import { FeeDto } from './dto';

@Controller()
class CommissionController {
  constructor(
    private readonly commissionService: CommissionService,
    private readonly fileReaderService: FileReaderService,
    @Inject(PROVIDERS.FILE_PATH) private readonly filePath: string,
  ) {}

  @Get()
  async calculateFeesFromFile() {
    const data = await this.fileReaderService.readJsonFile(this.filePath);
    return this.commissionService.calculateFees(data);
  }

  @Get('data')
  getMockData() {
    return this.fileReaderService.readJsonFile(this.filePath);
  }

  @Post()
  @HttpCode(200)
  calculateFees(@Body() body: FeeDto[]) {
    return this.commissionService.calculateFees(body);
  }
}

export default CommissionController;
