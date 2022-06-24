import { Body, Controller, Get, HttpCode, Param, Put } from '@nestjs/common'
import { Public } from '../auth/constants'
import { UsersService } from './user.service'
import { JwtReturnUserDto } from '../auth/dto/auth.dto'
import { UserReq } from './decorators/user.decorator'
import { UserSyncDiscordDto } from './dto/user-sync-discord.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { UserUpdatePoeResponse } from '../common-interface/user/UserUpdatePoeResponse'
import { UserSerializer } from './common/user_serializer'

@ApiBearerAuth()
@ApiTags('user')
@Controller('/api/user/')
export class UsersController {
  constructor(private _userService: UsersService) {}

  @Get()
  async getUser(@UserReq() user: JwtReturnUserDto): Promise<UserSerializer> {
    return this._userService.findUserByUuid(user.uuid)
  }

  @Put('character')
  @HttpCode(204)
  async updateUserChar(
    @UserReq() user: JwtReturnUserDto
  ): Promise<UserUpdatePoeResponse> {
    return this._userService.updateUserPoe({
      uuid: user.uuid,
      poeToken: user.poeToken
    })
  }

  @Put('discord')
  @HttpCode(204)
  async discordSync(
    @UserReq() user: JwtReturnUserDto,
    @Body() body: UserSyncDiscordDto
  ): Promise<void> {
    await this._userService.connectDiscord(user.uuid, body.code)
    return
  }

  @Public()
  @Get(':accountName')
  async getUserPublic(
    @Param('accountName') accountName: string
  ): Promise<UserSerializer> {
    return this._userService.findUserByAccountName(accountName)
  }
}
