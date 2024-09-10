import { Test, TestingModule } from '@nestjs/testing';
import FileReaderService from './file-reader.service';

const mock = [
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

describe('FileReaderService', () => {
  let service: FileReaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileReaderService],
    }).compile();

    service = module.get<FileReaderService>(FileReaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('readJsonFile', () => {
    it('should contain default file name', async () => {
      expect(service.defaultFileName).toEqual('data.json');
    });
    it('should contain mock data', async () => {
      const data = await service.readJsonFile();
      const firstItem = data[0];
      const firstMockItem = mock[0];
      expect(firstItem.user_type).toBe(firstMockItem.user_type);
      expect(firstItem.type).toBe(firstMockItem.type);
    });
  });
});
