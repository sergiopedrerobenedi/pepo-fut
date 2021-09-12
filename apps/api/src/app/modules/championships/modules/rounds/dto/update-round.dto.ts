import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { UpdateMatchDto } from '../../matchs/dto/update-match.dto';

export class UpdateRoundDto {
  @ApiProperty({
    required: false,
  })
  @IsUUID()
  @IsOptional()
  id?: string;

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
    type: UpdateMatchDto,
    isArray: true,
  })
  matchs: UpdateMatchDto[];
}
