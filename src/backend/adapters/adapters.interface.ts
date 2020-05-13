import ElectronAppAdapter from "Backend/adapters/electron-app/electron-app-adapter.interface"
import PurePhoneBackupAdapter from "Backend/adapters/pure-phone-backups/pure-phone-backups-adapter.class"
import PurePhoneBatteryServiceAdapter from "Backend/adapters/pure-phone-battery-service/pure-phone-battery-service-adapter.class"
import PurePhoneNetworkAdapter from "Backend/adapters/pure-phone-network/pure-phone-network-adapter.class"
import PurePhoneStorageAdapter from "Backend/adapters/pure-phone-storage/pure-phone-storage-adapter.class"
import PurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone-adapter.class"
import PhonebookAdapter from "Backend/adapters/phonebook/phonebook.class"

export default interface Adapters {
  app: ElectronAppAdapter
  purePhone: PurePhoneAdapter
  pureBatteryService: PurePhoneBatteryServiceAdapter
  pureStorage: PurePhoneStorageAdapter
  pureNetwork: PurePhoneNetworkAdapter
  pureBackups: PurePhoneBackupAdapter
  phonebook: PhonebookAdapter
}
