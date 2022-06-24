import { jwtConstants } from '../constants'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { JwtReturnUserDto } from '../dto/auth.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    })
  }

  validate(payload: JwtReturnUserDto) {
    return {
      uuid: payload.uuid,
      accountName: payload.accountName,
      poeToken: payload.poeToken,
      roles: payload.roles
    }
  }
}
