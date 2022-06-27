import { ApiProperty } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'
import { UserRoles } from '../../role/role.enum'

export class JwtReturnUserDto {
  @IsEnum(UserRoles, { each: true })
  @ApiProperty({ enum: UserRoles })
  readonly roles: string

  @ApiProperty()
  readonly uuid: string

  @ApiProperty()
  readonly accountName: string

  @ApiProperty()
  readonly poeToken: string
}
