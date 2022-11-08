/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import ElectronAppAdapter from "App/__deprecated__/backend/adapters/electron-app/electron-app-adapter.interface"
import PurePhoneAdapter from "App/__deprecated__/backend/adapters/pure-phone/pure-phone-adapter.class"
import DeviceFileSystemAdapter from "App/__deprecated__/backend/adapters/device-file-system/device-file-system-adapter.class"

export default interface Adapters {
  app: ElectronAppAdapter
  deviceFileSystem: DeviceFileSystemAdapter
  purePhone: PurePhoneAdapter
}
