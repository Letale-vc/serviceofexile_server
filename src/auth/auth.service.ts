import { JwtReturnUserDto } from './dto/auth.dto'
import { UsersService } from '../users/user.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { findLastChar } from '../poe_fetch/findLastCharPoe'
import { getProfilePoe } from '../poe_fetch/getProfilePoe'
import { authPoe } from '../poe_fetch/authPoe'
import axios from 'axios'

@Injectable()
export class AuthService {
  constructor(
    private _usersService: UsersService,
    private _jwtService: JwtService
  ) {}

  async validateUser(
    code: string
  ): Promise<{ accountName: string; uuid: string; poeToken: string }> {
    try {
      const authPoeResponse = await authPoe(code)
      const profilePoe = await getProfilePoe(authPoeResponse.access_token)

      const ckeckUser = await this._usersService.findUserForAuth(
        profilePoe.uuid
      )
      if (ckeckUser !== undefined) {
        return {
          accountName: ckeckUser.accountName,
          uuid: ckeckUser.uuid,
          poeToken: authPoeResponse.access_token
        }
      }
      const lastChar = await findLastChar(authPoeResponse.access_token)
      const userCreating = await this._usersService.createUser(
        profilePoe.uuid,
        profilePoe.name,
        lastChar
      )
      return {
        accountName: userCreating.accountName,
        uuid: userCreating.uuid,
        poeToken: authPoeResponse.access_token
      }
    } catch (exception) {
      if (axios.isAxiosError(exception) && exception.response) {
        throw new HttpException(
          { message: exception.message },
          exception.response.status
        )
      }
      throw new HttpException(
         { message: 'Unknown error' },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  login(user: JwtReturnUserDto) {
    const payload = {
      accountName: user.accountName,
      uuid: user.uuid,
      poeToken: user.poeToken,
      roles: user.roles
    }
    const accessToken = this._jwtService.sign(payload)
    return { access_token: accessToken, ...payload }
  }
}
