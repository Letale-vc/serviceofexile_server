import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { DeleteResult, Repository } from 'typeorm'
import { League } from './league.entity'
import { LeagueDeleteDto } from './dto/LeagueDelete.dto'

@Injectable()
export class LeagueService {
  constructor(
    @InjectRepository(League) private _leagueRepository: Repository<League>
  ) {}

  async find(): Promise<League[]> {
    return this._leagueRepository.find({ cache: 60000 })
  }

  async add(name: string): Promise<League | League[]> {
    if (name === 'Standart' || name === 'Hardcore') {
      return this._leagueRepository.save({ name })
    }
    return this._leagueRepository.save([{ name }, { name: `${name} Hardcore` }])
  }

  async delete(
    league: LeagueDeleteDto | LeagueDeleteDto[]
  ): Promise<DeleteResult> {
    // const leagueFind = await this._leagueRepository.find({
    //   where: leagueDeleteDTO,
    //   relations: ['services'],
    // });
    return this._leagueRepository
      .createQueryBuilder()
      .delete()
      .where(league)
      .execute()
  }
}
