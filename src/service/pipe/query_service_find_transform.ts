import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class ServiceFindQueryParse implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { type } = metadata
    if (type === 'query') return this.transformQuery({ query: value })
    return value
  }

  // eslint-disable-next-line class-methods-use-this
  transformQuery({ query }: { query: any }) {
    if (typeof query !== 'object') return query
    const { leagueId, serviceNameId } = query

    let newQuery = { ...query }

    if (leagueId)
      newQuery = { ...newQuery, leagueId: Number.parseInt(leagueId, 10) }
    if (serviceNameId)
      newQuery = {
        ...newQuery,
        serviceNameId: Number.parseInt(serviceNameId, 10)
      }
    return newQuery
  }
}
