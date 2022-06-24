import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Post,
  Put,
  Query
} from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { DeleteResult } from 'typeorm'
import { JwtReturnUserDto } from '../auth/dto/auth.dto'
import { Banlist } from '../banlist/banlist.entity'
import { BanlistService } from '../banlist/banlist.service'
import { BanlistAddDto } from '../banlist/dto/banlist-add.dto'
import { BanlistDeleteDto } from '../banlist/dto/banlist-delete.dto'
import { UserReq } from '../users/decorators/user.decorator'
import { UsersService } from '../users/user.service'
import { UserRoleGiveDto } from './dto/give_role.dto'

@ApiBearerAuth()
@Controller('/api/admin/')
export class AdminController {
  constructor(
    private _banlistService: BanlistService,
    private _userService: UsersService
  ) {}

  @Post('banned')
  async BannedUser(
    @UserReq() user: JwtReturnUserDto,
    @Body() banlistAddDTO: BanlistAddDto
  ): Promise<Banlist> {
   return await this._banlistService.add(banlistAddDTO, user.uuid)
  }

  @Delete('unbanned')
  async UnbannedUser(
    @Query() banlistDeleteDTO: BanlistDeleteDto
  ): Promise<DeleteResult> {
    return  await this._banlistService.delete(banlistDeleteDTO.accountName)
  }

  @Put('roles')
  @HttpCode(204)
  async changeUserRoles(
    @Body() { uuid, roles }: UserRoleGiveDto
  ): Promise<void> {
    await this._userService.userRoleChange(uuid, roles)
  }
}
