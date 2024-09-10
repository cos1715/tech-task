import { Controller, Post, Body } from '@nestjs/common';
import CommissionService from './commission.service';
import { FeeDto } from './dto';

@Controller('commission')
class CommissionController {
  constructor(private readonly commissionService: CommissionService) {}

  @Post('/calculate')
  calculateFees(@Body() body: FeeDto[]) {
    return this.commissionService.calculateFees(body);
  }
}

export default CommissionController;
