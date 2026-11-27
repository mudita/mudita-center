/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface SetUsbAccessPayload {
  serialPortAccess?: boolean
  grantAccessToSerialPortResult?: boolean
  // Delay (ms) before the grant result is returned, keeps the processing modal visible
  grantAccessToSerialPortDelay?: number
}
