import { IsDefined, IsArray, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator'

export class ServiceNameCreateMassDto {
  @ApiProperty()
  @IsDefined()
  @IsArray()
  @MinLength(2, { each: true })
  readonly names: string[]
}
