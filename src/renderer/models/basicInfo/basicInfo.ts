import { getActiveNetworkFromSim } from "Renderer/models/basicInfo/utils/helpers"
import getBackupsInfo from "Renderer/requests/get-backups-info.request"
import getBatteryInfo from "Renderer/requests/get-battery-info.request"
import getDeviceInfo from "Renderer/requests/get-device-info.request"
import getNetworkInfo from "Renderer/requests/get-network-info.request"
import getStorageInfo from "Renderer/requests/get-storage-info.request"
import { InitialState } from "./interfaces"
import disconnectDevice from "Renderer/requests/disconnect-device.request"

// TODO: implement mock store feature.
const initialState = {
  disconnectedDevice: false,
  simCards: [],
  batteryLevel: 0,
  networkName: "",
  osVersion: "1.0",
  memorySpace: {
    free: 0,
    full: 16000000000,
  },
  lastBackup: "10.11.2019",
  osUpdateDate: "",
}

export default {
  state: initialState,
  reducers: {
    update(state: InitialState, payload: InitialState) {
      return { ...state, ...payload }
    },
  },
  effects: (dispatch: any) => ({
    updatePhoneBasicInfo(basicInfo: InitialState) {
      this.updatePhoneBasicInfo(basicInfo)
    },
    async loadData() {
      const info = await getDeviceInfo()
      const networkInfo = await getNetworkInfo()
      const storageInfo = await getStorageInfo()
      const batteryInfo = await getBatteryInfo()
      const backupsInfo = await getBackupsInfo()
      console.log("info", info)
      console.log("network", networkInfo)
      console.log("storage", storageInfo)
      console.log("battery", batteryInfo)
      console.log("backups", backupsInfo)
      console.log("updatedate", info.osUpdateDate)
      dispatch.basicInfo.update({
        batteryLevel: batteryInfo.level,
        osVersion: info.osVersion,
        modelName: info,
        simCards: networkInfo.simCards,
        memorySpace: {
          full: storageInfo.capacity,
          free: storageInfo.available,
        },
        networkName: getActiveNetworkFromSim(networkInfo.simCards),
        lastBackup:
          backupsInfo.backups[backupsInfo.backups.length - 1].createdAt,
        osUpdateDate: info.osUpdateDate,
      })
    },
    async disconnect() {
      const disconnectInfo = await disconnectDevice()
      dispatch.basicInfo.update({
        disconnectedDevice: disconnectInfo.disconnected,
      })
    },
  }),
}
