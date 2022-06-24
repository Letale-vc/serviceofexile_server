import {
  IsString,
  IsDefined,
  IsNumber,
  IsArray,
  MinLength
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator'

export class ServiceNameCreateDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  readonly name: string

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  readonly serviceCategoryId: number
}
export class ServiceNameCreateMassDto {
  @ApiProperty()
  @IsDefined()
  @IsArray()
  @MinLength(2, { each: true })
  readonly names: string[]
}

export class ServiceNameCreateMassBodyDto {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  readonly serviceCategoryId: number
}
