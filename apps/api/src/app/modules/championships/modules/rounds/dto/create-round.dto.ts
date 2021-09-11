import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateRoundDto {
  @ApiProperty({
    required: true,
    example: 13,
  })
  @IsInt()
  number: number;

  @ApiProperty({
    required: false,
    example: 'La jornada se disputará el día 11 y 13 de agosto debido al parón de selecciones',
  })
  @IsString()
  @IsOptional()
  comment?: string;
}
