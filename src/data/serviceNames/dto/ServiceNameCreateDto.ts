import { IsString, IsDefined, IsNumber } from 'class-validator'
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
