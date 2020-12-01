import { getActiveNetworkFromSim } from "Renderer/models/basic-info/utils/helpers"
import getBackupsInfo from "Renderer/requests/get-backups-info.request"
import getBatteryInfo from "Renderer/requests/get-battery-info.request"
import getDeviceInfo from "Renderer/requests/get-device-info.request"
import getNetworkInfo from "Renderer/requests/get-network-info.request"
import getStorageInfo from "Renderer/requests/get-storage-info.request"
import connectDevice from "Renderer/requests/connect-device.request"
import disconnectDevice from "Renderer/requests/disconnect-device.request"
import changeSimRequest from "Renderer/requests/change-sim.request"
import { Dispatch } from "Renderer/store"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { Slicer } from "@rematch/select"
import {
  ResultsState,
  SimCard,
  StoreData,
} from "Renderer/models/basic-info/interfaces"

const initialState = {
  disconnectedDevice: true,
  resultsState: ResultsState.Empty,
}

export default {
  state: initialState,
  reducers: {
    setResultsState(state: StoreData, resultsState: ResultsState): StoreData {
      return { ...state, resultsState }
    },
    update(state: StoreData, payload: any): StoreData {
      return { ...state, ...payload }
    },
    updateSim(state: StoreData, payload: number): StoreData {
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
      dispatch.basicInfo.setResultsState(ResultsState.Loading)
      const responses = await Promise.all([
        getDeviceInfo(),
        getNetworkInfo(),
        getStorageInfo(),
        getBatteryInfo(),
        getBackupsInfo(),
      ])

      if (
        responses.every(
          ({ status, data }) =>
            status === DeviceResponseStatus.Ok && data !== undefined
        )
      ) {
        const [
          info,
          networkInfo,
          storageInfo,
          batteryInfo,
          backupsInfo,
        ] = responses

        const [lastBackup] = backupsInfo.data!.backups.sort(
          (a, b) =>
            Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
        )

        dispatch.basicInfo.update({
          batteryLevel: batteryInfo.data!.level,
          osVersion: info.data!.osVersion,
          simCards: networkInfo.data!.simCards,
          memorySpace: {
            full: storageInfo.data!.capacity,
            free: storageInfo.data!.available,
          },
          lastBackup,
          osUpdateDate: info.data!.osUpdateDate,
        })
        dispatch.basicInfo.setResultsState(ResultsState.Loaded)
      } else {
        dispatch.basicInfo.setResultsState(ResultsState.Error)
      }
    },
    async connect() {
      const { status } = await connectDevice()

      if (status === DeviceResponseStatus.Ok){
        dispatch.basicInfo.update({
          disconnectedDevice: false,
        })

        dispatch.basicInfo.loadData()
      }
    },
    async fakeConnect() {
      dispatch.basicInfo.update({
        disconnectedDevice: false,
      })
    },
    async disconnect() {
      const disconnectInfo = await disconnectDevice()
      if (disconnectInfo.status === DeviceResponseStatus.Ok) {
        dispatch.basicInfo.update({
          disconnectedDevice: true,
        })
      }
    },
    async toggleDisconnectedDevice(disconnectedDevice: boolean) {
      dispatch.basicInfo.update({ disconnectedDevice })

      if(!disconnectedDevice){
        dispatch.basicInfo.loadData()
      }
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
      return slice((state: { simCards?: SimCard[] }) => {
        return getActiveNetworkFromSim(state.simCards)
      })
    },
    isConnected() {
      return slice((state: StoreData) => {
        return (
          state.resultsState === ResultsState.Loaded &&
          !state.disconnectedDevice
        )
      })
    },
  }),
}
