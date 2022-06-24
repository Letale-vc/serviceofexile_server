import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class ServiceFindQueryParse implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { type } = metadata
    if (type === 'query') return this.transformQuery(value)
    return value
  }

  transformQuery(query: any) {
    if (typeof query !== 'object') return query
    const { leagueId, serviceNameId } = query
    if (leagueId) query.leagueId = Number.parseInt(leagueId)
    if (serviceNameId) query.serviceNameId = Number.parseInt(serviceNameId)
    return query
  }
}
