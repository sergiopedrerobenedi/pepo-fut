import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('championships')
@Controller(`championships`)
export class ChampionshipsController {}
