import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class NewTokenDto {
  @ApiProperty()
  @IsString()
  refreshToken: string;
}
