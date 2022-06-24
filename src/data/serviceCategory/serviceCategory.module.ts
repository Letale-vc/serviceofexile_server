import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServiceCategory } from './serviceCategory.entity'
import { ServiceCategoryController } from './serviceCategory.controller'
import { ServiceCategoryService } from './serviceCategory.service'

@Module({
  imports: [TypeOrmModule.forFeature([ServiceCategory])],
  controllers: [ServiceCategoryController],
  providers: [ServiceCategoryService],
  exports: [ServiceCategoryService]
})
export class ServiceCategoryModule {}
