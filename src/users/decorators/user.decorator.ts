import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { JwtReturnUserDto } from '../../auth/dto/auth.dto'

export const UserReq = createParamDecorator<JwtReturnUserDto>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  }
)
