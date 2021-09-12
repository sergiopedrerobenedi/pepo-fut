import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { CreateMatchDto } from '../../matchs/dto/create-match.dto';

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

  @ApiProperty({
    required: true,
    type: CreateMatchDto,
    isArray: true,
  })
  matchs: CreateMatchDto[];
}
