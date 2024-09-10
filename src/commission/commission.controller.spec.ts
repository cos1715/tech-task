import { Test, TestingModule } from '@nestjs/testing';
import PROVIDERS from '../const/providers';
import CommissionController from './commission.controller';
import CommissionService from './service/commission.service';
import FileReaderService from './service/file-reader.service';

const testData = [
  {
    date: '2016-01-05',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_in',
    operation: {
      amount: 200.0,
      currency: 'EUR',
    },
  },
];

describe('CommissionController', () => {
  let controller: CommissionController;
  let commissionService: CommissionService;
  let fileReaderService: FileReaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommissionController],
      providers: [
        CommissionService,
        FileReaderService,
        {
          provide: PROVIDERS.FILE_PATH,
          useValue: 'data.json',
        },
      ],
    }).compile();

    commissionService = module.get<CommissionService>(CommissionService);
    fileReaderService = module.get<FileReaderService>(FileReaderService);
    controller = module.get<CommissionController>(CommissionController);
  });

  describe('calculateFeesFromFile', () => {
    it('should return calculated fees from file data', async () => {
      const mockResult = ['0.06'];

      jest.spyOn(fileReaderService, 'readJsonFile').mockResolvedValue(testData);
      jest
        .spyOn(commissionService, 'calculateFees')
        .mockResolvedValue(mockResult);

      expect(await controller.calculateFeesFromFile()).toBe(mockResult);
    });
  });
});
