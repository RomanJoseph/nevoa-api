import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from 'src/infra/plugins/jwt/jwt.service';
import { UserRepository } from 'src/modules/users/repositories/user.repository';
import { User } from 'src/modules/users/entities/user.entity';
import { TokenPayload } from '../types/tokenPayload';

@Injectable()
export class ValidateTokenService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async execute(token: string): Promise<User> {
    try {
      const decoded = this.jwtService.verify(token) as TokenPayload;
      const userId = decoded.sub;

      const user = await this.userRepository.findById(userId);

      if (!user) {
        throw new UnauthorizedException('Invalid token.');
      }

      return { ...user };
    } catch {
      throw new UnauthorizedException('Invalid token.');
    }
  }
}
