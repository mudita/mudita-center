import getFakeAdapters from "App/tests/get-fake-adapters"
import createElectronAppAdapter from "Backend/adapters/electron-app/electron-app.adapter"
import registerBackupsInfoRequest from "Backend/requests/backups/get-backups-info.request"
import registerBatteryInfoRequest from "Backend/requests/battery/get-battery-info.request"
import registerChangeSimCardRequest from "Backend/requests/change-sim/change-sim.request"
import registerDeviceInfoRequest from "Backend/requests/device-info/get-device-info.request"
import registerDisconnectDeviceRequest from "Backend/requests/disconnect-device/disconnect-device.request"
import registerNetworkInfoRequest from "Backend/requests/network/get-network-info.request"
import registerPurePhoneStorageRequest from "Backend/requests/storage/get-storage-info.request"
import registerFileDownloadRequest from "Backend/requests/file-download/file-download.request"

const bootstrap = () => {
  const appAdapter = createElectronAppAdapter()
  ;[
    registerDeviceInfoRequest,
    registerBackupsInfoRequest,
    registerNetworkInfoRequest,
    registerPurePhoneStorageRequest,
    registerBatteryInfoRequest,
    registerDisconnectDeviceRequest,
    registerChangeSimCardRequest,
    registerFileDownloadRequest,
  ].forEach(register =>
    register({
      // TODO: Replace with a proper adapters when phone becomes available.
      ...getFakeAdapters(),
      app: appAdapter,
    })
  )
}

export default bootstrap
