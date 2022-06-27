import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { DeleteResult, Repository } from 'typeorm'
import { ServiceCategory } from './serviceCategory.entity'

@Injectable()
export class ServiceCategoryService {
  constructor(
    @InjectRepository(ServiceCategory)
    private _serviceCategoryRepository: Repository<ServiceCategory>
  ) {}

  async findOne(id: number): Promise<ServiceCategory> {
    return this._serviceCategoryRepository.findOne({ where: { id } })
  }

  async takeServiceNames(): Promise<string[]> {
    const names = await this._serviceCategoryRepository
      .createQueryBuilder('service_category')
      .select('service_category.name')
      .cache(true)
      .getMany()

    return names.reduce<string[]>((prev, current) => {
      return [...prev, current.name]
    }, [])
  }

  async findAllServiceCategory(): Promise<ServiceCategory[]> {
    return this._serviceCategoryRepository.find({
      relations: ['serviceName']
    })
  }

  async add(name: string): Promise<ServiceCategory> {
    return this._serviceCategoryRepository.save({ name })
  }

  async delete(id: number): Promise<DeleteResult> {
    return this._serviceCategoryRepository.delete(id)
  }
}
