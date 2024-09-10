import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as fs from 'fs';
import AppModule from '../src/app.module';

const mock = [
  {
    date: '2016-01-05',
    type: 'cash_in',
    user_id: 1,
    user_type: 'natural',
    operation: {
      amount: 200,
      currency: 'EUR',
    },
  },
  // Additional mock data if necessary...
];

// Mock the filesystem promises API
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
  },
}));

describe('App (e2e)', () => {
  let app: INestApplication;
  const mockResult = ['0.06'];
  const mockFileContent = JSON.stringify(mock);

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // afterAll(async () => {
  //   await app.close();
  // });

  it('/ (GET)', async () => {
    (fs.promises.readFile as jest.Mock).mockResolvedValue(mockFileContent);

    const response = await request(app.getHttpServer()).get('/').expect(200);

    expect(response.body).toStrictEqual(mockResult);
  });

  it('/data (GET)', async () => {
    (fs.promises.readFile as jest.Mock).mockResolvedValue(mockFileContent);

    const response = await request(app.getHttpServer())
      .get('/data')
      .expect(200);

    expect(response.body).toStrictEqual(mock);
  });

  it('/ (POST)', async () => {
    (fs.promises.readFile as jest.Mock).mockResolvedValue(mockFileContent);

    const response = await request(app.getHttpServer())
      .post('/')
      .send(mock)
      .expect(200);

    expect(response.body).toStrictEqual(mockResult);
  });
});
