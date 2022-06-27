import { Body, Controller, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ServiceCategoryCreateDto } from './dto/serviceCategory.dto'
import { ServiceCategoryService } from './serviceCategory.service'
import { ServiceCategory } from './serviceCategory.entity'
import { Public } from '../../auth/constants'

@Public()
@ApiBearerAuth()
@ApiTags('data/ServiceCategory')
@Controller('/api/data/servicecategory/')
export class ServiceCategoryController {
  constructor(private _serviceCategoryService: ServiceCategoryService) {}

  @Post()
  async addServiceCategory(
    @Body() { name }: ServiceCategoryCreateDto
  ): Promise<ServiceCategory> {
    return this._serviceCategoryService.add(name)
  }
}
