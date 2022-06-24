/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const removeDecoratorsFromPhoneNumber = (phoneNumber = ""): string => {
  const rawPhoneNumber = phoneNumber.replace(/[^\d]/g, "")
  if (rawPhoneNumber === "") {
    return phoneNumber.replace(/\s/g, "").toLowerCase()
  } else {
    return rawPhoneNumber
  }
}
