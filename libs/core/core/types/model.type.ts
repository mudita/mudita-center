/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface Model<Type extends { id: string } = { id: string }> {
  modelName: string
  all(): Type[]
  findById(id: string): Type | undefined
  create(data: Type): Type | undefined
  update(data: Type): Type | undefined
  delete(id: string): void
  beforeCreate(data: Type): Type
  beforeUpdate(data: Type): Type
  beforeDelete(data: Type): Type
  afterCreate(data: Type): void
  afterUpdate(data: Type): void
  afterDelete(data: Type): void
}
