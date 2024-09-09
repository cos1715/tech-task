import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import OperationDto from './operation.dto';

interface IFeeDto {
  date: string;

  user_id: number;

  user_type: 'natural' | 'juridical';

  type: 'cash_in' | 'cash_out';

  operation: OperationDto;
}

class CalculateFeeDto implements IFeeDto {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsEnum(['natural', 'juridical'])
  @IsNotEmpty()
  user_type: 'natural' | 'juridical';

  @IsEnum(['cash_in', 'cash_out'])
  @IsNotEmpty()
  type: 'cash_in' | 'cash_out';

  @ValidateNested({ each: true })
  @Type(() => OperationDto)
  operation: OperationDto;
}

export default CalculateFeeDto;
