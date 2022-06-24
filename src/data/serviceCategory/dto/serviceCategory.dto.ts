import { ApiProperty } from '@nestjs/swagger'

export class ServiceCategoryCreateDto {
  @ApiProperty()
  readonly name: string
}
