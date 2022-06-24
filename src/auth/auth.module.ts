import { JwtStrategy } from './strategies/jwt.stategy'
import { CastomStrategy } from './strategies/auth.stategy'
import { AuthController } from './auth.controller'
import { UserModule } from '../users/user.module'
import { jwtConstants } from './constants'
import { AuthService } from './auth.service'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtAuthGuard } from './guards/JwtAuth.guard'
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '90d' }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    CastomStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AuthModule {}
