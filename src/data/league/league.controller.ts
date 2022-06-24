import { LeagueCreateDto, LeagueDeleteDto } from './dto/league.dto'
import { LeagueService } from './league.service'
import { Body, Controller, Delete, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { League } from './league.entity'
import { DeleteResult } from 'typeorm'

@ApiBearerAuth()
@ApiTags('data/league')
@Controller('/api/data/league/')
export class LeagueController {
  constructor(private _leagueService: LeagueService) {}

  @Post()
  async addLeague(
    @Body() { name }: LeagueCreateDto
  ): Promise<League | League[]> {
    return this._leagueService.add(name)
  }

  @Delete()
  async deleteLeague(
    @Body() leagueCreateDTO: LeagueDeleteDto | LeagueDeleteDto[]
  ): Promise<DeleteResult> {
    return this._leagueService.delete(leagueCreateDTO)
  }
}
