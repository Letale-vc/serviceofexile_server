import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { ServiceName } from './serviceName.entity'
import { Repository, DeleteResult } from 'typeorm'
import {
  ServiceNameCreateDto,
  ServiceNameCreateMassDto
} from './dto/serviceName.dto'

@Injectable()
export class ServiceNameService {
  constructor(
    @InjectRepository(ServiceName)
    private readonly _serviceNameRepository: Repository<ServiceName>
  ) {}

  async findAll(): Promise<ServiceName[]> {
    return this._serviceNameRepository.find({ cache: 600000 })
  }

  async add({
    name,
    serviceCategoryId
  }: ServiceNameCreateDto): Promise<ServiceName> {
    const serviceName = new ServiceName()
    serviceName.name = name
    serviceName.serviceCategory.id = serviceCategoryId
    return this._serviceNameRepository.save(serviceName)
  }

  async addMass(
    parseJson: ServiceNameCreateMassDto,
    serviceCategoryId: number
  ): Promise<ServiceName[]> {
    const array = parseJson.names.map((el) => ({
      name: el,
      serviceCategory: { id: serviceCategoryId }
    }))
    return this._serviceNameRepository.save(array)
  }

  async delete(serviceNameId: number): Promise<DeleteResult> {
    return this._serviceNameRepository.delete(serviceNameId)
  }
}
