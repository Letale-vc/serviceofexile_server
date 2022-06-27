import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Public } from '../auth/constants'
import { Data } from './data.entity'
import { DataService } from './data.service'

@ApiTags('data')
@Controller('/api/data')
export class DataController {
  constructor(private readonly _dataService: DataService) {}

  @Public()
  @Get()
  getData(): Promise<Data> {
    return this._dataService.createData()
  }
}
