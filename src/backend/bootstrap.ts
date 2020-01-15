import createElectronAppAdapter from "Backend/adapters/electron-app/electron-app.adapter"
import createFakePurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone-fake.adapter"
import registerDeviceInfoRequest from "Backend/requests/device-info/get-device-info.request"

const bootstrap = () => {
  const appAdapter = createElectronAppAdapter()
  // TODO: Replace with a proper adapter when phone becomes available.
  const phoneAdapter = createFakePurePhoneAdapter()
  ;[registerDeviceInfoRequest].forEach(register =>
    register({
      app: appAdapter,
      purePhone: phoneAdapter,
    })
  )
}

export default bootstrap
