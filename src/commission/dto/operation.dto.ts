import { IsNumber, IsString } from 'class-validator';

interface IOperationDto {
  amount: number;
  currency: string;
}

class OperationDto implements IOperationDto {
  @IsNumber()
  amount: number;

  @IsString()
  currency: string;
}

export default OperationDto;
