import { ServiceNameModule } from './serviceNames/serviceName.module'
import { LeagueModule } from './league/league.module'
import { ServiceCategoryModule } from './serviceCategory/serviceCategory.module'
import { DataController } from './data.controller'
import { DataService } from './data.service'
import { Module } from '@nestjs/common'
import { CurrencyModule } from './currency/currency.module'

@Module({
  imports: [
    CurrencyModule,
    LeagueModule,
    ServiceNameModule,
    ServiceCategoryModule
  ],
  controllers: [DataController],
  providers: [DataService]
})
export class DataModule {}
