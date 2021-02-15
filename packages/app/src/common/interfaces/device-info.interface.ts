/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

export default interface DeviceInfo {
  // User-assigned device's name.
  readonly name: string

  // Device's model name.
  readonly modelName: string

  // Device's model number.
  readonly modelNumber: string

  // Device's serial number.
  readonly serialNumber: string

  // Current OS version.
  readonly osVersion: string

  // Date at which OS was updated. ISO date.
  readonly osUpdateDate: string
}
