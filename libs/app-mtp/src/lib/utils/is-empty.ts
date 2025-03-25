/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/**
 * Helper function to check if a value is considered "empty."
 * This is a temporary helper until MTP is used as a mock.
 */
export const isEmpty = (value: unknown): boolean => {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    value === 0 ||
    value === "0"
  )
}
