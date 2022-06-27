import { IsDefined, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator'

export class ServiceNameCreateMassBodyDto {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  readonly serviceCategoryId: number
}
