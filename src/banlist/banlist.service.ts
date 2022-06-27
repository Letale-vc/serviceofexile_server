import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DeleteResult } from 'typeorm'
import { Banlist } from './banlist.entity'
import { BanlistAddDto } from './dto/banlist-add.dto'
import { UsersService } from '../users/user.service'
import { User } from '../users/entities/user.entity'

@Injectable()
export class BanlistService {
  constructor(
    @InjectRepository(Banlist)
    private readonly _banlistRepository: Repository<Banlist>,
    private readonly _userService: UsersService
  ) {}

  async findOne(uuid: string): Promise<Banlist | undefined> {
    return this._banlistRepository.findOne({
      where: { user: { uuid } },
      relations: ['user', 'whoBanned']
    })
  }

  async findAll(): Promise<Banlist[]> {
    return this._banlistRepository.find({ relations: ['user', 'whoBanned'] })
  }

  async add(
    banlistAddDto: BanlistAddDto,
    whoBannedUserUuid: string
  ): Promise<Banlist> {
    const user = await this._userService.findUserForBanlist(
      banlistAddDto.accountName
    )
    const banlist = new Banlist()
    const userWhoBanned = new User()
    banlist.user = user
    banlist.reasonBan = banlistAddDto.reasonBan
    banlist.whoBanned = userWhoBanned
    banlist.whoBanned.uuid = whoBannedUserUuid

    return this._banlistRepository.save(banlist)
  }

  async delete(accountName: string): Promise<DeleteResult> {
    return this._banlistRepository.delete({
      user: { accountName }
    })
  }
}
