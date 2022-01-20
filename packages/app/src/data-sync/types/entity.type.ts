/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type Entity<Type> = {
  _id: string
} & Type

export interface DBQueryResult<Columns, Value> {
  columns: Columns[]
  values: Value[]
}
