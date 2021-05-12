/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  getActiveNetworkFromSim,
  getActiveNetworkLevelFromSim,
} from "Renderer/models/basic-info/utils/helpers"
import getBackupsInfo from "Renderer/requests/get-backups-info.request"
import getBatteryInfo from "Renderer/requests/get-battery-info.request"
import getDeviceInfo from "Renderer/requests/get-device-info.request"
import getNetworkInfo from "Renderer/requests/get-network-info.request"
import getStorageInfo from "Renderer/requests/get-storage-info.request"
import connectDevice from "Renderer/requests/connect-device.request"
import disconnectDevice from "Renderer/requests/disconnect-device.request"
import changeSimRequest from "Renderer/requests/change-sim.request"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { createSelector, Slicer, StoreSelectors } from "@rematch/select"
import {
  DataState,
  SimCard,
  StoreValues,
} from "Renderer/models/basic-info/basic-info.typings"
import { createModel } from "@rematch/core"
import { RootState } from "Renderer/store"
import { RootModel } from "Renderer/models/models"

export const initialState: StoreValues = {
  deviceConnected: false,
  deviceUpdating: false,
  deviceUnblocked: undefined,
  initialDataLoaded: false,
  basicInfoDataState: DataState.Empty,
  batteryLevel: 0,
  memorySpace: { free: 0, full: 0 },
  networkName: "",
  osUpdateDate: "",
  osVersion: "",
  simCards: [],
}

const basicInfo = createModel<RootModel>({
  state: initialState,
  reducers: {
    setBasicInfoDataState(
      state: StoreValues,
      basicInfoDataState: DataState
    ): StoreValues {
      return { ...state, basicInfoDataState }
    },
    update(state: StoreValues, payload: any): StoreValues {
      return { ...state, ...payload }
    },
    updateSim(state: StoreValues, payload: number): StoreValues {
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
    toggleDeviceUpdating(
      state: StoreValues,
      deviceUpdating: boolean
    ): StoreValues {
      return { ...state, deviceUpdating }
    },
  },
  effects: (d: any) => {
    const dispatch = (d as unknown) as RootState
    let basicInfoDataLoading = false
    let initialDataLoading = false

    return {
      async loadInitialData(_: any) {
        if (initialDataLoading) {
          return
        }
        initialDataLoading = true

        await dispatch.basicInfo.loadBasicInfoData()

        initialDataLoading = false
        dispatch.basicInfo.update({
          initialDataLoaded: true,
        })
      },
      async loadBasicInfoData(_: any) {
        if (basicInfoDataLoading) {
          return
        }
        basicInfoDataLoading = true
        dispatch.basicInfo.setBasicInfoDataState(DataState.Loading)
        const responses = await Promise.all([
          getDeviceInfo(),
          getNetworkInfo(),
          getStorageInfo(),
          getBatteryInfo(),
          getBackupsInfo(),
        ])

        basicInfoDataLoading = false

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
          dispatch.basicInfo.setBasicInfoDataState(DataState.Loaded)
        } else {
          dispatch.basicInfo.setBasicInfoDataState(DataState.Error)
        }
      },
      async connect() {
        const { status } = await connectDevice()

        if (status === DeviceResponseStatus.Ok) {
          dispatch.basicInfo.update({
            deviceConnected: true,
          })

          await dispatch.basicInfo.loadInitialData()
        }
      },
      async disconnect() {
        const disconnectInfo = await disconnectDevice()
        if (disconnectInfo.status === DeviceResponseStatus.Ok) {
          dispatch.basicInfo.update({
            deviceConnected: false,
            initialDataLoaded: false,
          })
        }
      },
      async toggleDeviceConnected(
        deviceConnected: boolean,
        rootState: { basicInfo: { deviceUpdating: boolean } }
      ) {
        if (deviceConnected) {
          dispatch.basicInfo.update({ deviceConnected })
        } else {
          dispatch.basicInfo.update({
            deviceConnected,
            initialDataLoaded: false,
          })
        }

        if (deviceConnected && !rootState.basicInfo.deviceUpdating) {
          await dispatch.basicInfo.loadInitialData()
        }
      },
      async changeSim(simCard: SimCard) {
        const changeSimInfo = await changeSimRequest()
        if (changeSimInfo.status === DeviceResponseStatus.Ok) {
          dispatch.basicInfo.updateSim(simCard.number)
        }
      },
    }
  },
  selectors: (slice: Slicer<typeof initialState>) => ({
    initialDataLoaded() {
      return slice(({ initialDataLoaded }) => initialDataLoaded)
    },
    deviceConnected() {
      return slice(({ deviceConnected }) => deviceConnected)
    },
    deviceUpdating() {
      return slice(({ deviceUpdating }) => deviceUpdating)
    },
    activeSimNetworkName() {
      return slice((state: { simCards?: SimCard[] }) => {
        return getActiveNetworkFromSim(state.simCards)
      })
    },
    activeNetworkLevelFromSim() {
      return slice((state: { simCards?: SimCard[] }) => {
        return getActiveNetworkLevelFromSim(state.simCards)
      })
    },
    pureFeaturesVisible(models: StoreSelectors<any>) {
      return createSelector(
        models.basicInfo.initialDataLoaded,
        models.basicInfo.deviceConnected,
        models.basicInfo.deviceUpdating,
        (initialDataLoaded, deviceConnected, deviceUpdating) => {
          return (initialDataLoaded && deviceConnected) || deviceUpdating
        }
      )
    },
  }),
})

export default basicInfo
