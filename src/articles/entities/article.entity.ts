import { Column, Entity, Index } from 'typeorm'

import { BaseEntity } from '@/shared/entities'

import { ArticleType } from '../enums/article-type.enum'

@Entity()
export class Article extends BaseEntity {
  @Column('text')
  title: string

  @Column('text')
  summary: string

  @Index()
  @Column({
    type: 'enum',
    enum: ArticleType,
  })
  type: ArticleType

  @Index()
  @Column('date')
  publishedAt: Date

  @Column('text')
  referenceUrl: string

  @Column('text')
  referenceName: string
}
