/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const checkFullName = <
  T extends { firstName?: string; lastName?: string }
>(
  { firstName, lastName }: T,
  searchPhrase: string
): boolean => {
  if (firstName && lastName) {
    const fullName = `${firstName} ${lastName}`.trim().toLowerCase()
    if (fullName.includes(searchPhrase)) {
      return true
    }
  }
  return false
}
