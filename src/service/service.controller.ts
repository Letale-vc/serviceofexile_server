import { JwtReturnUserDto } from '../auth/dto/auth.dto'
import { UserReq } from '../users/decorators/user.decorator'
import { ServiceCreateDto } from './dto/service-create.dto'
import { Controller, Post, Body, Put, Get, Delete, Query } from '@nestjs/common'
import { ServiceService } from './service.service'
import { ServiceUpdateDto } from './dto/service-update.dto'
import { ServiceDeleteDto } from './dto/service-delete.dto'
import { ServicesFindDto } from './dto/service-find.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ServiceFindQueryParse } from './pipe/query_service_find_transform'
import { UpdateResult } from 'typeorm'
import { ServiceSerializer } from './common/service_serializer'

@ApiTags('services')
@Controller('/api/services/')
export class ServiceController {
  constructor(private _serviceService: ServiceService) {}

  @ApiBearerAuth()
  @Put()
  async updateService(
    @UserReq() user: JwtReturnUserDto,
    @Body() serviceUpdateDto: ServiceUpdateDto
  ): Promise<UpdateResult> {
    return this._serviceService.update(serviceUpdateDto, user.uuid)
  }

  @ApiBearerAuth()
  @Post()
  async createService(
    @UserReq() user: JwtReturnUserDto,
    @Body() servicesCreateDto: ServiceCreateDto
  ): Promise<void> {
    return this._serviceService.create(servicesCreateDto, user.uuid)
  }

  serviceNameId: number

  leagueId: number

  sellOrBuy: string

  @Get()
  async getServices(
    @Query(new ServiceFindQueryParse()) servicesFindDto: ServicesFindDto
  ): Promise<ServiceSerializer> {
    return this._serviceService.find(servicesFindDto)
  }

  @ApiBearerAuth()
  @Delete()
  async deleteService(
    @UserReq() user: JwtReturnUserDto,
    @Body() serviceDeleteDTO: ServiceDeleteDto
  ) {
    return this._serviceService.delete(serviceDeleteDTO.uuid, user.uuid)
  }
}
