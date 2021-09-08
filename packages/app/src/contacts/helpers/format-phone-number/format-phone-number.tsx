/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const formatPhoneNumber = (number: string): string => {
  if (number.length === 12) {
    return number.replace(/(.{3})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4")
  } else if (number.length === 9) {
    return number.replace(/(.{3})(\d{3})(\d{3})/, "$1 $2 $3")
  }
  return number
}
