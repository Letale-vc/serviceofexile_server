import { Body, Controller, Delete, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { DeleteResult } from 'typeorm'
import { LeagueCreateDto } from './dto/leagueCreate.dto'
import { LeagueDeleteDto } from './dto/LeagueDelete.dto'
import { LeagueService } from './league.service'
import { League } from './league.entity'

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
