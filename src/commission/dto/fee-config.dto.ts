export interface IFeeConfigCashIn {
  percents: number;
  max: { amount: number; currency: string };
}

export interface IFeeConfigCashOutNatural {
  percents: number;
  week_limit: { amount: number; currency: string };
}

export interface IFeeConfigCashOutLegal {
  percents: number;
  min: { amount: number; currency: string };
}
