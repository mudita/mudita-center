/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import createFakeElectronAppAdapter from "Backend/adapters/electron-app/fake-electron-app.adapter"
import createFakePurePhoneBackupsAdapter from "Backend/adapters/pure-phone-backups/pure-phone-backups-fake.adapter"
import createFakePurePhoneBatteryAdapter from "Backend/adapters/pure-phone-battery-service/pure-phone-battery-service-fake.adapter"
import createFakePurePhoneNetworkAdapter from "Backend/adapters/pure-phone-network/pure-phone-network-fake.adapter"
import createFakePurePhoneStorageAdapter from "Backend/adapters/pure-phone-storage/pure-phone-storage-fake.adapter"
import createFakePurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone-fake.adapter"
import createFakePhonebookAdapter, {
  PhonebookFakeAdapterProps,
} from "Backend/adapters/phonebook/phonebook-fake.adapter"
import createFakeAppSettingsAdapter from "Backend/adapters/app-settings/app-settings-fake.adapter"
import { SettingsUpdateOption } from "App/main/store/settings.interface"

type FakeAdaptersProps = PhonebookFakeAdapterProps & {
  updateOption: SettingsUpdateOption
}

const getFakeAdapters = ({
  updateOption = { key: "appAutostart", value: true },
}: Partial<FakeAdaptersProps> = {}): Adapters => ({
  app: createFakeElectronAppAdapter(),
  appSettings: createFakeAppSettingsAdapter(updateOption),
  purePhone: createFakePurePhoneAdapter(),
  pureBatteryService: createFakePurePhoneBatteryAdapter(),
  pureStorage: createFakePurePhoneStorageAdapter(),
  pureNetwork: createFakePurePhoneNetworkAdapter(),
  pureBackups: createFakePurePhoneBackupsAdapter(),
  phonebook: createFakePhonebookAdapter(),
})

export default getFakeAdapters
