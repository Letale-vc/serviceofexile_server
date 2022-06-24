import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsUUID } from 'class-validator'

export class ServiceDeleteDto {
  @ApiProperty()
  @IsUUID()
  @IsDefined()
  uuid: string
}
