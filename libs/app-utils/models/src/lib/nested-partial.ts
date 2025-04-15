/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type NestedPartial<T> = {
  [K in keyof T]?: T extends Array<infer R>
    ? Array<NestedPartial<R>>
    : NestedPartial<T[K]>
}
