import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsString } from 'class-validator'

export class BanlistDeleteDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  accountName: string
}
