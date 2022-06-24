import { IsDefined, IsString } from 'class-validator'

export class UserRoleGiveDto {
  @IsString()
  @IsDefined()
  uuid: string

  roles: number[]
}
