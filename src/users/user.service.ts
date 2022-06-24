import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, ObjectLiteral, Repository } from 'typeorm'
import axios from 'axios'
import { User } from './entities/user.entity'
import { UserSerializer } from './common/user_serializer'
import { stringify } from 'querystring'
import { Role } from '../role/role.entity'
import { findLastChar } from '../poe_fetch/findLastCharPoe'
import { getProfilePoe } from '../poe_fetch/getProfilePoe'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private _usersRepository: Repository<User>
  ) {}

  async userRoleChange(uuid: string, roles: number[]): Promise<void> {
    const updateUser = new User()
    updateUser.uuid = uuid
    const newRoles = roles.map((el) => {
      const newRole = new Role()
      newRole.id = el
      return newRole
    })
    updateUser.roles = newRoles
    const test = await this._usersRepository.save(updateUser)
    console.log(test)
  }

  async findUserForAuth(uuid: string): Promise<User> | undefined {
    const findUserForAuthResponseDB = await  this._usersRepository
      .createQueryBuilder('user')
      .select(['user.uuid', 'user.accountName'])
      .where('user.uuid = :uuid', { uuid })
      .leftJoinAndSelect('user.roles', 'roles')
      .getOne()
      if (findUserForAuthResponseDB.uuid){
        return findUserForAuthResponseDB
      }
      else{
        return undefined
      } 
  }

  async findUserForBanlist(accountName: string): Promise<User> {
    return this._usersRepository.findOne({
      where: { accountName: ILike(`%${accountName}%`) }
    })
  }

  private _findUserAny(
    where: string,
    parameters: ObjectLiteral
  ): Promise<User> {
    return this._usersRepository
      .createQueryBuilder('user')
      .where(where, parameters)
      .leftJoinAndSelect('user.services', 'services')
      .leftJoinAndSelect('services.league', 'league')
      .leftJoinAndSelect('services.serviceName', 'serviceName')
      .leftJoinAndSelect('serviceName.serviceCategory', 'serviceCategory')
      .leftJoinAndSelect('services.currency', 'currency')
      .leftJoinAndSelect('user.roles', 'roles')
      .loadRelationCountAndMap(
        'user.vouches_unique_all',
        'user.vouches_all',
        'vouches_all',
        (qb) => qb.distinctOn(['vouches_all']).addGroupBy('vouches_all.*')
      )
      .loadRelationCountAndMap(
        'user.vouches_all',
        'user.vouches_all',
        'vouches_all'
      )
      .loadRelationCountAndMap(
        'user.vouches_unique_league',
        'user.vouches_league',
        'vouches_league',
        (qb) => qb.distinctOn(['vouches_league']).addGroupBy('vouches_league.*')
      )
      .loadRelationCountAndMap(
        'user.vouches_league',
        'user.vouches_league',
        'vouches_league'
      )
      .getOne()
  }

  async findUserByUuid(uuid: string): Promise<UserSerializer> {
    const user = await this._findUserAny('user.uuid = :uuid', { uuid: uuid })

    return new UserSerializer(user)
  }

  async findUserByAccountName(accountName: string): Promise<UserSerializer> {
    const user = await this._findUserAny(
      'user.accountName ILIKE :accountName',
      {
        accountName: `%${accountName}%`
      }
    )
    if (!user)
      throw new HttpException(
        { message: 'User not found' },
        HttpStatus.NOT_FOUND
      )
    return new UserSerializer(user)
  }

  async updateUserPoe({ uuid, poeToken }) {
    const profilePoe = await getProfilePoe(poeToken)
    const charName = await findLastChar(poeToken)

    const user = new User()
    user.characterName = charName
    user.accountName = profilePoe.name
    await this._usersRepository.update(uuid, user)
    return {
      characterName: user.characterName,
      accountName: user.accountName
    }
  }

  async connectDiscord(uuid: string, code: string): Promise<User> {
    const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID
    const DISCORD_REDIRECT_URI = 'https://serviceofexile.com/callback/discord'
    const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET
    const data = {
      client_id: DISCORD_CLIENT_ID,
      grant_type: 'authorization_code',
      client_secret: DISCORD_CLIENT_SECRET,
      code: code,
      redirect_uri: DISCORD_REDIRECT_URI,
      scope: 'identify'
    }
    const reqHeaders = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    const resp = await axios.post<{ access_token: string }>(
      'https://discord.com/api/oauth2/token',

      stringify(data),
      reqHeaders
    )

    const responsDiscordUser = await axios.get<{
      id: string
      username: string
      discriminator: string
      avatar: string
      verified: boolean
      email: string
      flags: number
      banner: string
      accent_color: number
      premium_type: number
      public_flags: number
    }>('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${resp.data.access_token}`
      }
    })
    const updateDiscordUser = new User()
    updateDiscordUser.uuid = uuid
    updateDiscordUser.discord = `${responsDiscordUser.data.username}#${responsDiscordUser.data.discriminator}`
    updateDiscordUser.discordId = responsDiscordUser.data.id
    return this._usersRepository.save(updateDiscordUser)
  }

  async checkHaveUser(uuid: string): Promise<User> {
    return this._usersRepository.findOne({ where: { uuid } })
  }

  async createUser(
    uuid: string,
    name: string,
    lastChar: string
  ): Promise<User> {
    const user = new User()
    user.uuid = uuid
    user.accountName = name
    user.characterName = lastChar
    const userCreate = await this._usersRepository.save(user)

    return userCreate
  }
}
