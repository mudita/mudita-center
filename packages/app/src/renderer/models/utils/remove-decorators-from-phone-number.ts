/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

export const removeDecoratorsFromPhoneNumber = (string = ""): string => {
  return string.replace(/[^\d]/g, "")
}
