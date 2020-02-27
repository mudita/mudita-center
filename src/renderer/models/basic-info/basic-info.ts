import { getActiveNetworkFromSim } from "Renderer/models/basic-info/utils/helpers"
import getBackupsInfo from "Renderer/requests/get-backups-info.request"
import getBatteryInfo from "Renderer/requests/get-battery-info.request"
import getDeviceInfo from "Renderer/requests/get-device-info.request"
import getNetworkInfo from "Renderer/requests/get-network-info.request"
import getStorageInfo from "Renderer/requests/get-storage-info.request"
import { InitialState, SimCard } from "./interfaces"
import disconnectDevice from "Renderer/requests/disconnect-device.request"
import changeSimRequest from "Renderer/requests/change-sim.request"
import { Dispatch } from "Renderer/store"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { Slicer } from "@rematch/select"

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
    update(state: InitialState, payload: any) {
      return { ...state, ...payload }
    },
    updateSim(state: InitialState, payload: number) {
      const newSim = [
        {
          ...state.simCards[0],
          active: state.simCards[0].number === payload,
        },
        {
          ...state.simCards[1],
          active: state.simCards[1].number === payload,
        },
      ]
      return { ...state, simCards: newSim }
    },
  },
  effects: (dispatch: Dispatch) => ({
    async loadData() {
      const [
        info,
        networkInfo,
        storageInfo,
        batteryInfo,
        backupsInfo,
      ] = await Promise.all([
        getDeviceInfo(),
        getNetworkInfo(),
        getStorageInfo(),
        getBatteryInfo(),
        getBackupsInfo(),
      ])
      dispatch.basicInfo.update({
        batteryLevel: batteryInfo.level,
        osVersion: info.osVersion,
        simCards: networkInfo.simCards,
        memorySpace: {
          full: storageInfo.capacity,
          free: storageInfo.available,
        },
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
    async changeSim(simCard: SimCard) {
      const changeSimInfo = await changeSimRequest()
      if (changeSimInfo.status === DeviceResponseStatus.Ok) {
        dispatch.basicInfo.updateSim(simCard.number)
      }
    },
  }),
  selectors: (slice: Slicer<typeof initialState>) => ({
    activeSimNetworkName() {
      return slice(state => {
        return getActiveNetworkFromSim(state.simCards)
      })
    },
  }),
}
