import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import CommissionService from './commission.service';
import { loadApi, getDateInfo, formatMoney } from '../utils';
import { FeeDto } from './dto';

const CASH_IN_FEE = { percents: 0.03, max: { amount: 5, currency: 'EUR' } };
const CASH_OUT_NATURAL_FEE = {
  percents: 0.3,
  week_limit: { amount: 1000, currency: 'EUR' },
};
const CASH_OUT_LEGAL_FEE = {
  percents: 0.3,
  min: { amount: 0.5, currency: 'EUR' },
};

jest.mock('../utils', () => ({
  loadApi: jest.fn(),
  getDateInfo: jest.fn(),
  formatMoney: jest.fn(),
}));

describe('CommissionService', () => {
  let service: CommissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommissionService],
    }).compile();

    service = module.get<CommissionService>(CommissionService);
    service.cashIn = null;
    service.cashOutNatural = null;
    service.cashOutLegal = null;
    service.weeklyLimitTracker = {};

    (formatMoney as jest.Mock).mockImplementation((value: number) =>
      value.toFixed(2),
    );
    (getDateInfo as jest.Mock).mockReturnValue({ weekNo: 1, year: 2024 });
    (loadApi as jest.Mock).mockImplementation((url: string) => {
      if (url === service.CASH_IN_FEE_URL) {
        return CASH_IN_FEE;
      }
      if (url === service.CASH_OUT_NATURAL_FEE_URL) {
        return CASH_OUT_NATURAL_FEE;
      }
      if (url === service.CASH_OUT_LEGAL_FEE_URL) {
        return CASH_OUT_LEGAL_FEE;
      }
      return null;
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('initializeFeeConfig', () => {
    it('should initialize fee configurations', async () => {
      await service.initializeFeeConfig();
      expect(service.cashIn).toEqual(CASH_IN_FEE);
      expect(service.cashOutNatural).toEqual(CASH_OUT_NATURAL_FEE);
      expect(service.cashOutLegal).toEqual(CASH_OUT_LEGAL_FEE);
    });
  });

  describe('calculateFees', () => {
    it('should calculate fees for provided operations', async () => {
      const mockData: FeeDto[] = [
        {
          type: 'cash_in',
          user_type: 'natural',
          operation: { amount: 200, currency: 'EUR' },
          date: '2024-01-01',
          user_id: 1,
        },
        {
          type: 'cash_out',
          user_type: 'juridical',
          operation: { amount: 200, currency: 'EUR' },
          date: '2024-01-01',
          user_id: 1,
        },
        {
          type: 'cash_out',
          user_type: 'natural',
          operation: { amount: 200, currency: 'EUR' },
          date: '2024-01-02',
          user_id: 1,
        },
        {
          type: 'cash_out',
          user_type: 'natural',
          operation: { amount: 2000, currency: 'EUR' },
          date: '2024-01-02',
          user_id: 1,
        },
      ];

      await service.initializeFeeConfig();

      const fees = await service.calculateFees(mockData);

      expect(fees).toEqual(['0.06', '0.60', '0.00', '3.60']);
    });

    it('should throw an exception if fee calculation fails', async () => {
      (loadApi as jest.Mock).mockRejectedValue(new Error('API Error'));

      await expect(service.calculateFees([])).rejects.toThrow(HttpException);
    });
  });
});
