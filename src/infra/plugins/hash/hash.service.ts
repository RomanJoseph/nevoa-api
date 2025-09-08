import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  public async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, 10);
  }

  public async compare(plain: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(plain, encrypted);
  }
}
