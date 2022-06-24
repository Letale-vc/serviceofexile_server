import { ServiceCreateDto } from './dto/service-create.dto'
import { Service } from './service.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { User } from '../users/entities/user.entity'
import { ServiceName } from '../data/serviceNames/serviceName.entity'
import { League } from '../data/league/league.entity'
import { ServiceUpdateDto } from './dto/service-update.dto'
import { Currency } from '../data/currency/currency.entity'
import { ServicesFindDto } from './dto/service-find.dto'
import { ServiceSerializer } from './common/service_serializer'

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private _serviceRepository: Repository<Service>
  ) {}

  async find(serviceFindDTO: ServicesFindDto): Promise<ServiceSerializer> {
    const services = await this._serviceRepository
      .createQueryBuilder('services')
      .where('services.sellOrBuy = :sellOrBuy', {
        sellOrBuy: serviceFindDTO.sellOrBuy
      })
      .addOrderBy('services.price', 'ASC')
      .addOrderBy('services.currency', 'ASC')
      .leftJoinAndSelect('services.league', 'league')
      .andWhere('league.id = :id', { id: serviceFindDTO.leagueId })
      .leftJoinAndSelect('services.serviceName', 'serviceName')
      .leftJoinAndSelect('serviceName.serviceCategory', 'serviceCategory')
      .andWhere('serviceName.id = :id', { id: serviceFindDTO.serviceNameId })
      .leftJoinAndSelect('services.user', 'user')
      .andWhere('user.IsOnline = :IsOnline', { IsOnline: true })
      .loadRelationCountAndMap(
        'user.vouches_unique_all_count',
        'user.vouches_all',
        'vouches_all',
        (qb) => qb.distinctOn(['vouches_all']).addGroupBy('vouches_all.*')
      )
      .loadRelationCountAndMap('user.vouches_all_count', 'user.vouches_all')
      .loadRelationCountAndMap(
        'user.vouches_unique_league_count',
        'user.vouches_league',
        'vouches_league',
        (qb) => qb.distinctOn(['vouches_league']).addGroupBy('vouches_league.*')
      )
      .loadRelationCountAndMap(
        'user.vouches_league_count',
        'user.vouches_league'
      )
      .cache(true)
      .getManyAndCount()

    return new ServiceSerializer(services)
  }

  async findOne(uuid: string): Promise<Service> {
    return this._serviceRepository.findOne({
      where: { uuid },
      relations: ['user']
    })
  }

  async create(
    serviceCreateDto: ServiceCreateDto,
    uuid: string
  ): Promise<void> {
    const newService = new Service()
    newService.user = new User()
    newService.serviceName = new ServiceName()
    newService.league = new League()
    newService.currency = new Currency()
    newService.user.uuid = uuid
    newService.bulk = serviceCreateDto.bulk
    newService.currency.id = serviceCreateDto.currencyId
    newService.price = serviceCreateDto.price
    newService.sellOrBuy = serviceCreateDto.sellOrBuy
    newService.league.id = serviceCreateDto.leagueId
    newService.serviceName.id = serviceCreateDto.serviceNameId

    await this._serviceRepository.save(newService)
    return
  }

  async update(
    serviceUpdateDto: ServiceUpdateDto,
    userUuid: string
  ): Promise<UpdateResult> {
    const updateService = new Service()
    updateService.user = new User()
    updateService.serviceName = new ServiceName()
    updateService.league = new League()
    updateService.currency = new Currency()
    updateService.user.uuid = userUuid
    updateService.bulk = serviceUpdateDto.bulk
    updateService.currency.id = serviceUpdateDto.currencyId
    updateService.sellOrBuy = serviceUpdateDto.sellOrBuy
    updateService.league.id = serviceUpdateDto.leagueId
    updateService.serviceName.id = serviceUpdateDto.serviceNameId
    updateService.active = serviceUpdateDto.active

    return this._serviceRepository.update(
      { uuid: serviceUpdateDto.uuid, user: { uuid: userUuid } },
      updateService
    )
  }

  async delete(serviceUuid: string, userUuid: string): Promise<DeleteResult> {
    return this._serviceRepository.delete({
      uuid: serviceUuid,
      user: { uuid: userUuid }
    })
  }
}
