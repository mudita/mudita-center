import createElectronAppAdapter from "Backend/adapters/electron-app/electron-app.adapter"
import registerDeviceInfoRequest from "Backend/requests/get-device-info.request"

const bootstrap = () => {
  const appAdapter = createElectronAppAdapter()
  ;[registerDeviceInfoRequest].forEach(register =>
    register({
      app: appAdapter,
    })
  )
}

export default bootstrap
