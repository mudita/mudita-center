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
import createElectronAppAdapter from "Backend/adapters/electron-app/electron-app.adapter"
import createAppSettingsAdapter from "Backend/adapters/app-settings/app-settings.adapter"
import createPurePhoneBackupsAdapter from "Backend/adapters/pure-phone-backups/pure-phone-backups.adapter"
import createPurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone.adapter"
import registerDisconnectDeviceEmitter from "Backend/emiiters/register-disconnect-device.emitter"
import registerDataEmitter from "Backend/emiiters/register-data.emitter"

const bootstrap = (pureNode: any) => {
  pureNode.on("close", registerDisconnectDeviceEmitter)
  pureNode.on("data", registerDataEmitter)
  ;[
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
  ].forEach((register) =>
    register({
      // TODO: Replace with a proper adapters when phone becomes available.
      ...getFakeAdapters(),
      purePhone: createPurePhoneAdapter(pureNode),
      appSettings: createAppSettingsAdapter(),
      pureBackups: createPurePhoneBackupsAdapter(),
      app: createElectronAppAdapter(),
    })
  )
}

export default bootstrap
