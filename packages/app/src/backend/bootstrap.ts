/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { PureDeviceManager } from "@mudita/pure"
import { createDeviceService } from "Backend/device-service"
import getFakeAdapters from "App/tests/get-fake-adapters"
import registerBatteryInfoRequest from "Backend/requests/battery/get-battery-info.request"
import registerChangeSimCardRequest from "Backend/requests/change-sim/change-sim.request"
import registerDeviceInfoRequest from "Backend/requests/device-info/get-device-info.request"
import registerConnectDeviceRequest from "Backend/requests/connect-device/connect-device.request"
import registerDisconnectDeviceRequest from "Backend/requests/disconnect-device/disconnect-device.request"
import registerNetworkInfoRequest from "Backend/requests/network/get-network-info.request"
import registerPurePhoneStorageRequest from "Backend/requests/storage/get-storage-info.request"
import registerGetContactsRequest from "Backend/requests/phonebook/get-contacts.request"
import registerAddContactRequest from "Backend/requests/phonebook/add-contact.request"
import registerEditContactRequest from "Backend/requests/phonebook/edit-contact.request"
import registerDeleteContactsRequest from "Backend/requests/phonebook/delete-contacts.request"
import registerBackupsInfoRequest from "Backend/requests/backups/get-backups-info.request"
import registerAppSettingsRequest from "Backend/requests/app-settings/get-app-settings.request"
import registerAppSettingsUpdateRequest from "Backend/requests/app-settings/update-app-settings.request"
import registerAppSettingsResetRequest from "Backend/requests/app-settings/reset-app-settings.request"
import registerUpdateOsRequest from "Backend/requests/update-os/update-os.request"
import registerGetEventsRequest from "Backend/requests/calendar/get-events.request"
import registerGetThreadsRequest from "Backend/requests/messages/get-threads.request"
import registerGetMessagesByThreadIdRequest from "Backend/requests/messages/get-messages-by-thread-id.request"
import createElectronAppAdapter from "Backend/adapters/electron-app/electron-app.adapter"
import createAppSettingsAdapter from "Backend/adapters/app-settings/app-settings.adapter"
import createPurePhoneBackupsAdapter from "Backend/adapters/pure-phone-backups/pure-phone-backups.adapter"
import createPurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone.adapter"
import createPhonebook from "Backend/adapters/phonebook/phonebook.adapter"
import createPurePhoneBatteryAdapter from "Backend/adapters/pure-phone-battery-service/pure-phone-battery-service.adapter"
import createPurePhoneNetwork from "Backend/adapters/pure-phone-network/pure-phone-network.adapter"
import createPurePhoneStorageAdapter from "Backend/adapters/pure-phone-storage/pure-phone-storage.adapter"
import createPurePhoneMessagesAdapter from "Backend/adapters/pure-phone-messages/pure-phone-messages.adapter"
import createCalendarAdapter from "Backend/adapters/calendar/calendar.adapter"
import Backend from "Backend/backend"

const bootstrap = (
  deviceManager: PureDeviceManager,
  ipcMain: MainProcessIpc
): void => {
  const deviceService = createDeviceService(deviceManager, ipcMain)

  const adapters = {
    purePhone: createPurePhoneAdapter(deviceService),
    phonebook: createPhonebook(deviceService),
    pureBatteryService: createPurePhoneBatteryAdapter(deviceService),
    pureNetwork: createPurePhoneNetwork(deviceService),
    pureStorage: createPurePhoneStorageAdapter(deviceService),
    appSettings: createAppSettingsAdapter(),
    pureBackups: createPurePhoneBackupsAdapter(),
    calendar: createCalendarAdapter(),
    pureMessages: createPurePhoneMessagesAdapter(deviceService),
    app: createElectronAppAdapter(),
  }

  const requests = [
    registerDeviceInfoRequest,
    registerNetworkInfoRequest,
    registerPurePhoneStorageRequest,
    registerBatteryInfoRequest,
    registerConnectDeviceRequest,
    registerDisconnectDeviceRequest,
    registerChangeSimCardRequest,
    registerGetContactsRequest,
    registerAddContactRequest,
    registerEditContactRequest,
    registerDeleteContactsRequest,
    registerBackupsInfoRequest,
    registerAppSettingsRequest,
    registerAppSettingsUpdateRequest,
    registerAppSettingsResetRequest,
    registerUpdateOsRequest,
    registerGetEventsRequest,
    registerGetThreadsRequest,
    registerGetMessagesByThreadIdRequest,
  ]

  new Backend(adapters, getFakeAdapters(), requests).init()
}

export default bootstrap
