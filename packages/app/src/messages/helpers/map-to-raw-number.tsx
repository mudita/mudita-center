/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const mapToRawNumber = (phoneNumber: string): string => {
  if (/^[+]*[(]?[0-9]{1,3}[)]?[-\s\./0-9]*$/g.test(phoneNumber)) {
    return phoneNumber.replace(/\s/g, "")
  } else {
    return phoneNumber
  }
}
