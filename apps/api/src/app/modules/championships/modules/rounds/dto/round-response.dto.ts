import { ApiProperty } from '@nestjs/swagger';
import { MatchResponseDto } from '../../matchs/dto/match-response.dto';

export class RoundResponseDto {
  @ApiProperty({
    required: false,
  })
  id?: string;

  @ApiProperty({
    required: true,
    example: 13,
  })
  number: number;

  @ApiProperty({
    required: false,
    example: 'La jornada se disputará el día 11 y 13 de agosto debido al parón de selecciones',
  })
  comment?: string;

  @ApiProperty({
    required: true,
    type: MatchResponseDto,
    isArray: true,
  })
  matchs: MatchResponseDto[];
}
