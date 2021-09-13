import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { TOKEN_TYPE } from '../../auth.constants';

export class Token {
  @ApiProperty({
    required: true,
    type: String,
    description: 'The token required to access and consume all the services of the API',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZmYTgwODEzLWE1NDAtNDVmYi05MGIzLWNmZTBmNjUwZmQ2MyIsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTYzMTUyNjU4NiwiZXhwIjoxNjMxNjEyOTg2fQ.-k4dg-aZaHdzrHVhXzJLLx0-NShL_JX9F5oLc1nLrlY',
  })
  @IsString()
  readonly accessToken: string;

  @ApiProperty({
    required: true,
    type: String,
    description: `The token type. It's always "Bearer"`,
    example: 'Bearer',
  })
  @IsString()
  readonly tokenType: string;
  @ApiProperty({
    type: String,
    description: 'The token required to accquire a new access token',
  })
  @IsString()
  readonly refreshToken: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'The lifetime in seconds of the access token',
  })
  @IsInt()
  readonly expiresIn: number;

  constructor(accessToken: string, expiresIn?: number, refreshToken?: string, scope?: string) {
    this.accessToken = accessToken;
    this.tokenType = TOKEN_TYPE;
    this.expiresIn = expiresIn;
    this.refreshToken = refreshToken || null;
  }
}
