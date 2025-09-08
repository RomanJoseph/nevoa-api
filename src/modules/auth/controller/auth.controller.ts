import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RegisterUserService } from '../services/registerUser.service';
import { LoginUserService } from '../services/loginUser.service';
import { ValidateTokenService } from '../services/validateToken.service';
import { RegisterUserRequest } from './request/registerUser.request';
import { LoginUserRequest } from './request/loginUser.request';
import { LoginUserResponse } from './response/loginUser.response';
import { AuthGuard } from '../guards/auth.guard';
import { User } from 'src/modules/users/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserService: RegisterUserService,
    private readonly loginUserService: LoginUserService,
    private readonly validateTokenService: ValidateTokenService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully registered.',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({
    status: 409,
    description: 'User with this email already exists.',
  })
  register(@Body() registerUserRequest: RegisterUserRequest): Promise<User> {
    return this.registerUserService.execute(registerUserRequest);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully logged in.',
    type: LoginUserResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  login(
    @Body() loginUserRequest: LoginUserRequest,
  ): Promise<LoginUserResponse> {
    return this.loginUserService.execute(loginUserRequest);
  }

  @Get('validate-token')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Validate a JWT token' })
  @ApiResponse({ status: 200, description: 'The token is valid.', type: User })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  validateToken() {
    // The AuthGuard will handle the token validation
    // and the user will be available in the request object
    // if the token is valid.
  }
}
