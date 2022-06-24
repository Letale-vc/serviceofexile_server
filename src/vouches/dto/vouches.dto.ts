import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsString } from 'class-validator'
export class VouchesGiveDTO {
  @ApiProperty()
  @IsString()
  @IsDefined()
  userUuid: string
}
