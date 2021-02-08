/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

export const isNameAvailable = ({
  firstName,
  lastName,
}: {
  firstName?: string
  lastName?: string
}): boolean => Boolean(firstName || lastName)
