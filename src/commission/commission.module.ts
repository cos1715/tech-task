import { Module } from '@nestjs/common';
import PROVIDERS from 'src/const/providers';
import CommissionController from './commission.controller';
import CommissionService from './service/commission.service';
import FileReaderService from './service/file-reader.service';

@Module({
  providers: [
    CommissionService,
    FileReaderService,
    {
      provide: PROVIDERS.FILE_PATH,
      useFactory: () => {
        const args = process.argv.slice(2);
        const filePath = args[0];
        return filePath;
      },
    },
  ],
  controllers: [CommissionController],
})
export default class CommissionModule {}
