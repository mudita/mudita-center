/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "App/__deprecated__/backend/adapters/adapters.interface"
import createFakeElectronAppAdapter from "App/__deprecated__/backend/adapters/electron-app/fake-electron-app.adapter"
import createFakePurePhoneBatteryAdapter from "App/__deprecated__/backend/adapters/pure-phone-battery-service/pure-phone-battery-service-fake.adapter"
import createFakePurePhoneNetworkAdapter from "App/__deprecated__/backend/adapters/pure-phone-network/pure-phone-network-fake.adapter"
import createFakePurePhoneStorageAdapter from "App/__deprecated__/backend/adapters/pure-phone-storage/pure-phone-storage-fake.adapter"
import createFakePurePhoneAdapter from "App/__deprecated__/backend/adapters/pure-phone/pure-phone-fake.adapter"
import createFakeCalendarAdapter from "App/__deprecated__/backend/adapters/calendar/calendar-fake.adapter"
import createFakeDeviceFileSystemAdapter from "App/__deprecated__/backend/adapters/device-file-system/device-file-system-fake.adapter"
import createFakeDeviceBackupAdapter from "App/__deprecated__/backend/adapters/device-backup/device-backup-fake.adapter"
import createFakeDeviceBaseInfoAdapter from "App/__deprecated__/backend/adapters/device-base-info/device-base-info-fake.adapter"

const getFakeAdapters = (): Adapters => ({
  app: createFakeElectronAppAdapter(),
  deviceBackup: createFakeDeviceBackupAdapter(),
  deviceBaseInfo: createFakeDeviceBaseInfoAdapter(),
  deviceFileSystem: createFakeDeviceFileSystemAdapter(),
  purePhone: createFakePurePhoneAdapter(),
  pureBatteryService: createFakePurePhoneBatteryAdapter(),
  pureStorage: createFakePurePhoneStorageAdapter(),
  pureNetwork: createFakePurePhoneNetworkAdapter(),
  calendar: createFakeCalendarAdapter(),
})

export default getFakeAdapters
