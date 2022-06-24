import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsString } from 'class-validator'

export class UserSyncDiscordDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  code: string
}
