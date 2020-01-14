import ElectronAppAdapter from "Backend/adapters/electron-app/electron-app-adapter.interface"
import PurePhoneBatteryServiceAdapter from "Backend/adapters/pure-phone-battery-service/pure-phone-battery-service-adapter.class"
import PurePhoneStorageAdapter from "Backend/adapters/pure-phone-storage/pure-phone-storage-adapter.class"
import PurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone-adapter.class"

export default interface Adapters {
  app: ElectronAppAdapter
  purePhone: PurePhoneAdapter
  pureBatteryService: PurePhoneBatteryServiceAdapter
  pureStorage: PurePhoneStorageAdapter
}
