import { HttpException, Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
class FileReaderService {
  defaultFileName = 'data.json';

  async readJsonFile(filePath?: string): Promise<any> {
    try {
      const file = filePath || this.defaultFileName;
      const absolutePath = path.resolve(file);
      const fileContent = await fs.readFile(absolutePath, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      throw new HttpException(`Failed to read JSON file: ${filePath}`, 500);
    }
  }
}

export default FileReaderService;
