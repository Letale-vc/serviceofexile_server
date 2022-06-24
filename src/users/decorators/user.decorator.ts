import { JwtReturnUserDto } from '../../auth/dto/auth.dto'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const UserReq = createParamDecorator<JwtReturnUserDto>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  }
)
