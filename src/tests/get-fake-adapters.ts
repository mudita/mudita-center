import Adapters from "Backend/adapters/adapters.interface"
import createFakeElectronAppAdapter from "Backend/adapters/electron-app/fake-electron-app.adapter"
import createFakePurePhoneBackupsAdapter from "Backend/adapters/pure-phone-backups/pure-phone-backups-fake.adapter"
import createFakePurePhoneBatteryAdapter from "Backend/adapters/pure-phone-battery-service/pure-phone-battery-service-fake.adapter"
import createFakePurePhoneNetworkAdapter from "Backend/adapters/pure-phone-network/pure-phone-network-fake.adapter"
import createFakePurePhoneStorageAdapter from "Backend/adapters/pure-phone-storage/pure-phone-storage-fake.adapter"
import createFakePurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone-fake.adapter"

const getFakeAdapters = (): Adapters => ({
  app: createFakeElectronAppAdapter(),
  purePhone: createFakePurePhoneAdapter(),
  pureBatteryService: createFakePurePhoneBatteryAdapter(),
  pureStorage: createFakePurePhoneStorageAdapter(),
  pureNetwork: createFakePurePhoneNetworkAdapter(),
  pureBackups: createFakePurePhoneBackupsAdapter(),
})

export default getFakeAdapters
