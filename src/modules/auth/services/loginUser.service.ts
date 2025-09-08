import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HashService } from 'src/infra/plugins/hash/hash.service';
import { JwtService } from 'src/infra/plugins/jwt/jwt.service';
import { UserRepository } from 'src/modules/users/repositories/user.repository';
import { LoginUserRequest } from '../controller/request/loginUser.request';
import { LoginUserResponse } from '../controller/response/loginUser.response';

@Injectable()
export class LoginUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}

  public async execute(data: LoginUserRequest): Promise<LoginUserResponse> {
    const user = await this.userRepository.findOneBy({ email: data.email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const passwordMatches = await this.hashService.compare(
      data.password,
      user.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const access_token = this.jwtService.sign({ sub: user.id });

    const { password, ...userResponse } = user;

    return { access_token, user: userResponse };
  }
}
