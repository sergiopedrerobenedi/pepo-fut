import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, ValidateNested } from 'class-validator';
import { TeamResponseDto } from '../../../../teams/dto/team-response.dto';

export class UpdateMatchDto {
  @ApiProperty({
    type: Date,
    required: true,
    example: new Date(),
  })
  @IsDateString()
  startDate: Date;

  @ApiProperty({
    type: TeamResponseDto,
    required: true,
    example: new TeamResponseDto(),
  })
  @Type(() => TeamResponseDto)
  @ValidateNested()
  localTeam: TeamResponseDto;

  @ApiProperty({
    type: TeamResponseDto,
    required: true,
    example: new TeamResponseDto(),
  })
  @Type(() => TeamResponseDto)
  @ValidateNested()
  awayTeam: TeamResponseDto;
}
