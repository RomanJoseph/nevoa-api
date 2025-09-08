import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly secret = process.env.JWT_SECRET || 'secret';

  public sign(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: '1d' });
  }

  public verify(token: string): any {
    return jwt.verify(token, this.secret);
  }
}
