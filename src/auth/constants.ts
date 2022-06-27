import { CustomDecorator, SetMetadata } from '@nestjs/common'

export const jwtConstants = {
  secret: 'MreRLrwmvVS'
}

export const IS_PUBLIC_KEY = 'isPublic'
export const Public = (): CustomDecorator => SetMetadata(IS_PUBLIC_KEY, true)
