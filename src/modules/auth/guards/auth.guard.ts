import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ValidateTokenService } from '../services/validateToken.service';
import { RequestWithUser } from '../types/requestWithUser';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly validateTokenService: ValidateTokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const { authorization } = request.headers;

    if (!authorization) {
      throw new UnauthorizedException('Token not provided.');
    }

    const [, token] = authorization.split(' ');

    if (!token) {
      throw new UnauthorizedException('Token not provided.');
    }

    try {
      const user = await this.validateTokenService.execute(token);
      request.user = user;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid token.');
    }
  }
}
