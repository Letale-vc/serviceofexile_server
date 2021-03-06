import {
  Body,
  Controller,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Express } from 'express'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { jsonFileFilter } from './fileHelper'
import { ServiceNameService } from './serviceName.service'
import { ServiceNameCreateMassDto } from './dto/ServiceNameCreateMass.dto'
import { ServiceNameCreateDto } from './dto/ServiceNameCreateDto'
import { ServiceName } from './serviceName.entity'
import { Public } from '../../auth/constants'

@ApiBearerAuth()
@ApiTags('data/servciesName')
@Public()
@Controller('/api/data/servicename/')
export class ServiceNameController {
  constructor(private readonly _serviceNameService: ServiceNameService) {}

  @Post()
  async addserviceName(
    @Body() serviceNameCreateDTO: ServiceNameCreateDto
  ): Promise<ServiceName> {
    return this._serviceNameService.add(serviceNameCreateDTO)
  }

  @Post('mass')
  @UseInterceptors(FileInterceptor('file', { fileFilter: jsonFileFilter }))
  async addServiceNameMass(
    @Body('serviceCategoryId', ParseIntPipe)
    serviceCategoryId: number,
    @UploadedFile() file: Express.Multer.File
  ): Promise<ServiceName[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parseJson: ServiceNameCreateMassDto = JSON.parse(
      file.buffer.toString()
    )

    return this._serviceNameService.addMass(parseJson, serviceCategoryId)
  }
}
