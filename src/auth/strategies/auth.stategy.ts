import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-custom'
import { AuthService } from '../auth.service'

@Injectable()
export class CastomStrategy extends PassportStrategy(Strategy, 'custom') {
  constructor(private _authService: AuthService) {
    super()
  }

  async validate({ body: { code } }): Promise<unknown> {
    if (!code) {
      throw new BadRequestException()
    }
    const user = await this._authService.validateUser(code)
    if (user === null) {
      throw new UnauthorizedException()
    }
    return user
  }
}
