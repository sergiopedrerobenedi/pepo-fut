import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    required: true,
    type: String,
    description: 'The username of the user that wants to log in to the API',
    example: 'test',
  })
  @IsString()
  readonly username: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'The password of the user that wants to log in to the API',
    example: 'test',
  })
  @IsString()
  readonly password: string;
}
