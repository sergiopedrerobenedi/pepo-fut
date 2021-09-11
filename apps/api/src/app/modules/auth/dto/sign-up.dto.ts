import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    required: true,
    type: String,
    description: "The user's username",
    example: 'test',
  })
  @IsString()
  readonly username: string;

  @ApiProperty({
    required: true,
    type: String,
    description: "The user's password ",
    example: 'test',
  })
  @IsString()
  readonly password: string;

  @ApiProperty({
    required: true,
    type: String,
    description: "The user's first name ",
    example: 'test',
  })
  @IsString()
  readonly firstName: string;

  @ApiProperty({
    required: true,
    type: String,
    description: "The user's last name ",
    example: 'test',
  })
  @IsString()
  readonly lastName: string;

  @ApiProperty({
    required: true,
    type: String,
    description: "The user's e-mail ",
    example: 'test@test.com',
  })
  @IsEmail()
  email: string;
}
