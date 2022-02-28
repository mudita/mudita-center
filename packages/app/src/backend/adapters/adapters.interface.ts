/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import ElectronAppAdapter from "Backend/adapters/electron-app/electron-app-adapter.interface"
import PurePhoneBatteryServiceAdapter from "Backend/adapters/pure-phone-battery-service/pure-phone-battery-service-adapter.class"
import PurePhoneNetworkAdapter from "Backend/adapters/pure-phone-network/pure-phone-network-adapter.class"
import PurePhoneStorageAdapter from "Backend/adapters/pure-phone-storage/pure-phone-storage-adapter.class"
import PurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone-adapter.class"
import PhonebookAdapter from "Backend/adapters/phonebook/phonebook-adapter.class"
import AppSettingsAdapter from "Backend/adapters/app-settings/app-settings-adapter.class"
import CalendarAdapter from "Backend/adapters/calendar/calendar-adapter.class"
import PurePhoneMessagesAdapter from "Backend/adapters/pure-phone-messages/pure-phone-messages.class"
import DeviceFileSystemAdapter from "Backend/adapters/device-file-system/device-file-system-adapter.class"
import DeviceBackupAdapter from "Backend/adapters/device-backup/device-backup-adapter.class"
import DeviceBaseInfoAdapter from "Backend/adapters/device-base-info/device-base-info-adapter.class"

export default interface Adapters {
  app: ElectronAppAdapter
  deviceBackup: DeviceBackupAdapter
  deviceBaseInfo: DeviceBaseInfoAdapter
  deviceFileSystem: DeviceFileSystemAdapter
  appSettings: AppSettingsAdapter
  purePhone: PurePhoneAdapter
  pureBatteryService: PurePhoneBatteryServiceAdapter
  pureStorage: PurePhoneStorageAdapter
  pureNetwork: PurePhoneNetworkAdapter
  phonebook: PhonebookAdapter
  calendar: CalendarAdapter
  pureMessages: PurePhoneMessagesAdapter
}
