import { Injectable } from '@nestjs/common'
import { omitBy } from 'lodash'
import { FindOptionsWhere, Repository, SelectQueryBuilder } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import { ErrorCode } from '@/shared/consts'
import { ensureIf } from '@/shared/utils'

import { BaseEntity } from './base.entity'

export interface ICommonQueryPayload<ENTITY extends BaseEntity> {
  pageOpt: { page: number; size: number }
  order?: { [key: string]: 'DESC' | 'ASC' }
  decorator?: (qb: SelectQueryBuilder<ENTITY>) => void
}

@Injectable()
export abstract class BaseEntityService<T_Entity extends BaseEntity> {
  protected constructor(protected readonly repository: Repository<T_Entity>) {}

  async create(input: Partial<T_Entity>): Promise<T_Entity> {
    const repo = this.repository.create(input as T_Entity)
    return this.repository.save(repo)
  }

  async findById(id: number): Promise<T_Entity> {
    const entity = await this.repository.findOneBy({
      id,
    } as FindOptionsWhere<T_Entity>)
    ensureIf(entity, ErrorCode.COMMON_NOT_FOUND)
    return entity
  }

  async update(
    id: number,
    input: QueryDeepPartialEntity<T_Entity>,
  ): Promise<void> {
    ensureIf(
      Object.keys(omitBy(input, (v) => v === undefined)).length > 0,
      ErrorCode.COMMON_NO_INPUT,
    )

    await this.repository.update(
      { id } as FindOptionsWhere<T_Entity>, //
      input,
    )
  }

  async remove(id: number): Promise<void> {
    await this.repository
      .createQueryBuilder('e')
      .delete()
      .where(`e.id = :id`, { id })
      .execute()
  }

  protected async query(
    payload: ICommonQueryPayload<T_Entity>,
  ): Promise<[T_Entity[], number]> {
    const take = payload.pageOpt.size
    const skip = (payload.pageOpt.page - 1) * take

    let qb = this.repository.createQueryBuilder('e')

    if (payload.decorator) {
      payload.decorator(qb)
    }

    qb = qb.select()

    qb = qb.skip(skip).take(take)

    if (!payload.order) {
      qb = qb.orderBy(`e.id`, 'DESC')
    } else {
      Object.entries(payload.order).map(([key, value]) => {
        qb = qb.addOrderBy(key, value)
      })
    }

    return qb.getManyAndCount()
  }
}
