import ElectronAppAdapter from "Backend/adapters/electron-app/electron-app-adapter.interface"
import PurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone-adapter.class"

export default interface Adapters {
  app: ElectronAppAdapter
  purePhone: PurePhoneAdapter
}
