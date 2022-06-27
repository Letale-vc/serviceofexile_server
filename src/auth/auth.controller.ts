import { Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { UserReq } from '../users/decorators/user.decorator'
import { AuthService } from './auth.service'
import { CastomAuthGuard } from './guards/local-auth.guard'
import { Public } from './constants'
import { JwtReturnUserDto } from './dto/auth.dto'
import { LoginDto } from './dto/Login.dto'

@ApiTags('auth')
@Controller('/api/auth/')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @Post('login')
  @Public()
  @UseGuards(CastomAuthGuard)
  login(@UserReq() user: JwtReturnUserDto): Promise<{ access_token: string }> {
    return Promise.resolve(this._authService.login(user))
  }
}
