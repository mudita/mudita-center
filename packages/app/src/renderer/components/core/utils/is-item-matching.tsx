/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type IsItemMatching = (item: any, searchString: string) => boolean
export const isItemValueMatching: IsItemMatching = (
  itemValue: string,
  search
) => itemValue.toLowerCase().includes(search.toLowerCase())
