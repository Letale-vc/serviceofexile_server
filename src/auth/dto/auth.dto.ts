import { ApiProperty } from '@nestjs/swagger'
import { IsDefined } from 'class-validator'
import { UserRoles } from '../../role/role.enum'

export class LoginDto {
  @ApiProperty()
  @IsDefined()
  readonly code: string
}

export class JwtReturnUserDto {
  @ApiProperty({ type: () => [UserRoles] })
  readonly roles: UserRoles[]

  @ApiProperty()
  readonly uuid: string

  @ApiProperty()
  readonly accountName: string

  @ApiProperty()
  readonly poeToken: string
}
