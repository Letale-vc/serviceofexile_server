import { IsDefined, IsString, IsUrl } from 'class-validator'

export class CurrencyAddDto {
  @IsDefined()
  @IsString()
  name: string

  @IsDefined()
  @IsUrl()
  url: string
}
