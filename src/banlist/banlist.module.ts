import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { Banlist } from './banlist.entity'
import { BanlistService } from './banlist.service'
import { UserModule } from '../users/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([Banlist]), UserModule],
  providers: [BanlistService],
  exports: [BanlistService]
})
export class BanlistModule {}
