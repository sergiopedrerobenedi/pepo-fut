import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { TOKEN_TYPE } from '../../auth.constants';

export class Token {
  @ApiProperty({
    required: true,
    type: String,
    description:
      'The token required to access and consume all the services of the API',
  })
  @IsString()
  readonly accessToken: string;

  @ApiProperty({
    required: true,
    type: String,
    description: `The token type. It's always "Bearer"`,
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
    type: String,
    description: 'The scope which the token belongs to',
  })
  @IsString()
  readonly scope: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'The lifetime in seconds of the access token',
  })
  @IsInt()
  readonly expiresIn: number;

  constructor(
    accessToken: string,
    expiresIn?: number,
    refreshToken?: string,
    scope?: string,
  ) {
    this.accessToken = accessToken;
    this.tokenType = TOKEN_TYPE;
    this.expiresIn = expiresIn;
    this.refreshToken = refreshToken || null;
    this.scope = scope || null;
  }
}
