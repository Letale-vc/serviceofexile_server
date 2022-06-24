import { VouchesController } from './vouches.controller'
import { VouchesService } from './vouches.service'
import { VouchesAll } from './entities/vouchesAll.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { VouchesLeague } from './entities/vouchesLeague.entity'

@Module({
  imports: [TypeOrmModule.forFeature([VouchesAll, VouchesLeague])],
  providers: [VouchesService],
  controllers: [VouchesController]
})
export class VouchesModule {}
