import getFakeAdapters from "App/tests/get-fake-adapters"
import createElectronAppAdapter from "Backend/adapters/electron-app/electron-app.adapter"
import registerDeviceInfoRequest from "Backend/requests/device-info/get-device-info.request"

const bootstrap = () => {
  const appAdapter = createElectronAppAdapter()
    // TODO: register all requests.
  ;[registerDeviceInfoRequest].forEach(register =>
    register({
      // TODO: Replace with a proper adapters when phone becomes available.
      ...getFakeAdapters(),
      app: appAdapter,
    })
  )
}

export default bootstrap
