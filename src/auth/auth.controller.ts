import { UserReq } from '../users/decorators/user.decorator'
import { AuthService } from './auth.service'
import { Controller, Post, UseGuards } from '@nestjs/common'
import { CastomAuthGuard } from './guards/local-auth.guard'
import { Public } from './constants'
import { JwtReturnUserDto, LoginDto } from './dto/auth.dto'
import { ApiBody, ApiTags } from '@nestjs/swagger'

@ApiTags('auth')
@Controller('/api/auth/')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @Post('login')
  @Public()
  @UseGuards(CastomAuthGuard)
  login(@UserReq() user: JwtReturnUserDto): Promise<{access_token: string}> {
    return Promise.resolve(this._authService.login(user))
  }
}
