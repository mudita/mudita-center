import createElectronAppAdapter from "Backend/adapters/electron-app/electron-app.adapter"
import createFakePurePhoneBatteryAdapter from "Backend/adapters/pure-phone-battery-service/pure-phone-battery-service-fake.adapter"
import createFakePurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone-fake.adapter"
import registerDeviceInfoRequest from "Backend/requests/device-info/get-device-info.request"

const bootstrap = () => {
  const appAdapter = createElectronAppAdapter()
  // TODO: Replace with a proper adapters when phone becomes available.
  const phoneAdapter = createFakePurePhoneAdapter()
  const batteryServiceAdapter = createFakePurePhoneBatteryAdapter()
  ;[registerDeviceInfoRequest].forEach(register =>
    register({
      app: appAdapter,
      purePhone: phoneAdapter,
      pureBatteryService: batteryServiceAdapter,
    })
  )
}

export default bootstrap
