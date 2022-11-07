/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import ElectronAppAdapter from "App/__deprecated__/backend/adapters/electron-app/electron-app-adapter.interface"
import PurePhoneBatteryServiceAdapter from "App/__deprecated__/backend/adapters/pure-phone-battery-service/pure-phone-battery-service-adapter.class"
import PurePhoneNetworkAdapter from "App/__deprecated__/backend/adapters/pure-phone-network/pure-phone-network-adapter.class"
import PurePhoneStorageAdapter from "App/__deprecated__/backend/adapters/pure-phone-storage/pure-phone-storage-adapter.class"
import PurePhoneAdapter from "App/__deprecated__/backend/adapters/pure-phone/pure-phone-adapter.class"
import DeviceFileSystemAdapter from "App/__deprecated__/backend/adapters/device-file-system/device-file-system-adapter.class"
import DeviceBaseInfoAdapter from "App/__deprecated__/backend/adapters/device-base-info/device-base-info-adapter.class"

export default interface Adapters {
  app: ElectronAppAdapter
  deviceBaseInfo: DeviceBaseInfoAdapter
  deviceFileSystem: DeviceFileSystemAdapter
  purePhone: PurePhoneAdapter
  pureBatteryService: PurePhoneBatteryServiceAdapter
  pureStorage: PurePhoneStorageAdapter
  pureNetwork: PurePhoneNetworkAdapter
}
