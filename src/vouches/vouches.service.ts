import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { VouchesAll } from './entities/vouchesAll.entity'
import { VouchesLeague } from './entities/vouchesLeague.entity'
import { User } from '../users/entities/user.entity'

@Injectable()
export class VouchesService {
  constructor(
    @InjectRepository(VouchesAll)
    private readonly _vouchesAllRepositiry: Repository<VouchesAll>,
    @InjectRepository(VouchesLeague)
    private readonly _vouchesLeagueAllRepositiry: Repository<VouchesLeague>
  ) {}

  async checkVouch(userUuid: string, whoGiveUuid: string): Promise<boolean> {
    const checkVouch = await this._vouchesAllRepositiry
      .createQueryBuilder('vouches_all')
      .orderBy('vouches_all.created_at', 'DESC')
      .groupBy('vouches_all.id')
      .leftJoin('vouches_all.user', 'user')
      .where('vouches_all.user.uuid = :uuid', { uuid: userUuid })
      .leftJoin('vouches_all.whoGive', 'whoGive')
      .andWhere('whoGive.uuid = :uuid', { uuid: whoGiveUuid })
      .getOne()

    if (checkVouch) {
      const dateCreatedVouch = new Date(checkVouch.created_at)
      const toDay = new Date()
      if (toDay.getTime() - dateCreatedVouch.getTime() <= 8640000) {
        return false
      }
    }
    return true
  }

  async saveVouch(userUuid: string, whoGiveUuid: string) {
    const vouchAll = new VouchesAll()
    vouchAll.user = new User()
    vouchAll.user.uuid = userUuid
    vouchAll.whoGive = new User()
    vouchAll.whoGive.uuid = whoGiveUuid
    const vouchLeague = new VouchesLeague()
    vouchLeague.user = new User()
    vouchLeague.user.uuid = userUuid
    vouchLeague.whoGive = new User()
    vouchLeague.whoGive.uuid = whoGiveUuid
    await this._vouchesAllRepositiry.save(vouchAll)
    await this._vouchesLeagueAllRepositiry.save(vouchAll)
  }
}
