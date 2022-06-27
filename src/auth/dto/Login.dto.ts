import { ApiProperty } from '@nestjs/swagger'
import { IsDefined } from 'class-validator'

export class LoginDto {
  @ApiProperty()
  @IsDefined()
  readonly code: string
}
