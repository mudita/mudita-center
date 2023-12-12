/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const sortByLastNameAscending = <T extends { lastName?: string }>(
  { lastName: aLastName = "" }: T,
  { lastName: bLastName = "" }: T
): number => {
  if (aLastName === bLastName) {
    return 0
  } else if (aLastName < bLastName) {
    return -1
  } else {
    return 1
  }
}
