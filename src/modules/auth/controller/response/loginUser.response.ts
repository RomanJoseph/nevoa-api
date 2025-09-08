import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEnum } from 'src/modules/users/enum/userRole.enum';

class UserData {
  @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  id: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'johndoe@example.com' })
  email: string;

  @ApiProperty({ enum: UserRoleEnum, example: UserRoleEnum.ADMIN })
  role: UserRoleEnum;

  @ApiProperty({ example: '2025-09-02T10:00:00.000Z' })
  created_at: Date;

  @ApiProperty({ example: '2025-09-02T10:00:00.000Z' })
  updated_at: Date;
}

export class LoginUserResponse {
  @ApiProperty({
    description: 'JWT Access Token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;

  @ApiProperty({ type: UserData })
  user: UserData;
}
