import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsString } from 'class-validator'
export class BanlistAddDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  accountName: string

  @ApiProperty()
  @IsDefined()
  @IsString()
  reasonBan: string
}
