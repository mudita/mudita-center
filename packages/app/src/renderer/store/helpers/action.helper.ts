/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const pendingAction = (event: any): string => {
  return [event, "pending"].join("/")
}

export const fulfilledAction = (event: any): string => {
  return [event, "fulfilled"].join("/")
}

export const rejectedAction = (event: any): string => {
  return [event, "rejected"].join("/")
}
