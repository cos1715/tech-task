import { Injectable } from '@nestjs/common';
import { getDateInfo, formatMoney, loadApi } from 'src/utils';
import {
  FeeDto,
  IFeeConfigCashIn,
  IFeeConfigCashOutLegal,
  IFeeConfigCashOutNatural,
} from './dto';

@Injectable()
class CommissionService {
  cashIn: IFeeConfigCashIn | null = null;

  cashOutNatural: IFeeConfigCashOutNatural | null = null;

  cashOutLegal: IFeeConfigCashOutLegal | null = null;

  weeklyLimitTracker: Record<string, number> = {};

  private readonly CASH_IN_FEE_URL =
    'https://developers.paysera.com/tasks/api/cash-in';

  private readonly CASH_OUT_NATURAL_FEE_URL =
    'https://developers.paysera.com/tasks/api/cash-out-natural';

  private readonly CASH_OUT_LEGAL_FEE_URL =
    'https://developers.paysera.com/tasks/api/cash-out-juridical';

  async initializeFeeConfig(): Promise<void> {
    if (!this.cashIn) {
      this.cashIn = await loadApi<IFeeConfigCashIn>(this.CASH_IN_FEE_URL);
    }
    if (!this.cashOutNatural) {
      this.cashOutNatural = await loadApi<IFeeConfigCashOutNatural>(
        this.CASH_OUT_NATURAL_FEE_URL,
      );
    }
    if (!this.cashOutLegal) {
      this.cashOutLegal = await loadApi<IFeeConfigCashOutLegal>(
        this.CASH_OUT_LEGAL_FEE_URL,
      );
    }
  }

  private calculateCashIn(amount: number) {
    const { percents, max } = this.cashIn;
    const calculatedFee = (amount * percents) / 100;
    const fee = Math.min(calculatedFee, max.amount);
    return formatMoney(fee);
  }

  private calculateCashOutNatural(
    userId: number,
    amount: number,
    date: string,
  ) {
    const { percents } = this.cashOutNatural;
    const { weekNo, year } = getDateInfo(date);
    const weekKey = `${userId}-${weekNo}-${year}`;
    const weeklyTotal = this.weeklyLimitTracker[weekKey] || 0;
    const remainingFreeAmount = Math.max(0, 1000 - weeklyTotal);

    let feeAmount = 0;
    if (amount > remainingFreeAmount) {
      const feeAmountDiff = amount - remainingFreeAmount;
      feeAmount = (feeAmountDiff * percents) / 100;
    }

    this.weeklyLimitTracker[weekKey] = weeklyTotal + amount;
    return formatMoney(feeAmount);
  }

  private calculateCashOutLegal(amount: number) {
    const { percents, min } = this.cashOutLegal;
    const calculatedFee = (amount * percents) / 100;
    const fee = Math.max(calculatedFee, min.amount);
    return formatMoney(fee);
  }

  private calculateCommission(data: FeeDto) {
    const {
      type,
      user_type: userType,
      operation,
      date,
      user_id: userId,
    } = data;
    const { amount } = operation;

    if (type === 'cash_in' && this.cashIn) {
      return this.calculateCashIn(amount);
    }

    if (type === 'cash_out') {
      if (userType === 'natural' && this.cashOutNatural) {
        return this.calculateCashOutNatural(userId, amount, date);
      }
      if (userType === 'juridical' && this.cashOutLegal) {
        return this.calculateCashOutLegal(amount);
      }
    }

    return 0;
  }

  async calculateFees(data: FeeDto[]) {
    await this.initializeFeeConfig();
    return data.map((operation) => this.calculateCommission(operation));
  }
}

export default CommissionService;
