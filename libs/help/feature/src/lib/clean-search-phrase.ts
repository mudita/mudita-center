/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const cleanSearchPhrase = (searchPhrase: string) => {
  return searchPhrase
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, "")
}
