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
  UpdatingState,
} from "Renderer/models/basic-info/basic-info.typings"
import { createModel } from "@rematch/core"
import { RootState } from "Renderer/store"
import { RootModel } from "Renderer/models/models"
import updateOs from "Renderer/requests/update-os.request"
import getDeviceLockTime from "App/renderer/requests/get-device-lock-time.request"

export const initialState: StoreValues = {
  deviceType: undefined,
  deviceConnected: false,
  updatingState: UpdatingState.Standby,
  deviceUnlocked: undefined,
  initialDataLoaded: false,
  basicInfoDataState: DataState.Empty,
  batteryLevel: 0,
  memorySpace: { free: 0, full: 0 },
  networkName: "",
  osUpdateDate: "",
  osVersion: undefined,
  simCards: [],
  lastBackup: undefined,
  serialNumber: undefined,
  phoneLockTime: undefined,
  caseColour: undefined,
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
    updateUpdatingState(
      state: StoreValues,
      updatingState: UpdatingState
    ): StoreValues {
      return { ...state, updatingState }
    },
  },
  effects: (d: any) => {
    const dispatch = d as unknown as RootState
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
          const [info, networkInfo, storageInfo, batteryInfo, backupsInfo] =
            responses

          const [lastBackup] = backupsInfo.data!.backups.sort(
            (a, b) =>
              Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
          )

          dispatch.basicInfo.update({
            batteryLevel: batteryInfo.data!.level,
            osVersion: info.data!.osVersion,
            serialNumber: info.data!.serialNumber,
            simCards: networkInfo.data!.simCards,
            memorySpace: {
              full: storageInfo.data!.capacity,
              free: storageInfo.data!.available,
            },
            lastBackup,
            osUpdateDate: info.data!.osUpdateDate,
            caseColour: info.data?.caseColour,
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
        }
      },
      async disconnect() {
        const disconnectInfo = await disconnectDevice()
        if (disconnectInfo.status === DeviceResponseStatus.Ok) {
          dispatch.basicInfo.update(initialState)
        }
      },
      async toggleDeviceConnected(
        deviceConnected: boolean,
        rootState: { basicInfo: { updatingState: UpdatingState } }
      ) {
        if (deviceConnected) {
          dispatch.basicInfo.update({ deviceConnected })
        } else {
          if (rootState.basicInfo.updatingState !== UpdatingState.Updating) {
            dispatch.basicInfo.update(initialState)
          } else {
            dispatch.basicInfo.update({
              deviceConnected: false,
              deviceUnlocked: undefined,
              initialDataLoaded: false,
            })
          }
        }
      },
      async toggleDeviceUnlocked(
        deviceUnlocked: boolean,
        rootState: {
          basicInfo: {
            initialDataLoaded: boolean
            deviceUnlocked: boolean
            phoneLockTime: number | undefined
          }
        }
      ) {
        if (
          deviceUnlocked &&
          deviceUnlocked === rootState.basicInfo.deviceUnlocked
        ) {
          return
        }
        if (!deviceUnlocked) {
          const response = await getDeviceLockTime()
          dispatch.basicInfo.update({
            deviceUnlocked,
            initialDataLoaded: false,
            phoneLockTime: response.data?.phoneLockTime,
          })
        } else {
          dispatch.basicInfo.update({
            deviceUnlocked,
            phoneLockTime: undefined,
          })
        }

        if (deviceUnlocked && !rootState.basicInfo.initialDataLoaded) {
          await dispatch.basicInfo.loadInitialData()
        }
      },
      async changeSim(simCard: SimCard) {
        const changeSimInfo = await changeSimRequest()
        if (changeSimInfo.status === DeviceResponseStatus.Ok) {
          dispatch.basicInfo.updateSim(simCard.number)
        }
      },
      async updateOs(fileName: string) {
        dispatch.basicInfo.updateUpdatingState(UpdatingState.Updating)
        const response = await updateOs(fileName)

        if (response.status !== DeviceResponseStatus.Ok) {
          dispatch.basicInfo.updateUpdatingState(UpdatingState.Fail)
          return
        }
        dispatch.basicInfo.updateUpdatingState(UpdatingState.Success)
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
    deviceUnlocked() {
      return slice(({ deviceUnlocked }) => deviceUnlocked)
    },
    phoneLockTime() {
      return slice(({ phoneLockTime }) => phoneLockTime)
    },
    updatingState() {
      return slice(({ updatingState }) => updatingState)
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
    deviceParred(models: StoreSelectors<any>) {
      return createSelector(
        models.basicInfo.deviceUnlocked,
        models.basicInfo.initialDataLoaded,
        (deviceUnlocked, initialDataLoaded) => {
          return deviceUnlocked && initialDataLoaded
        }
      )
    },
    deviceConnecting(models: StoreSelectors<any>) {
      return createSelector(
        models.basicInfo.initialDataLoaded,
        models.basicInfo.deviceConnected,
        models.basicInfo.deviceUnlocked,
        (initialDataLoaded, deviceConnected, deviceUnlocked) => {
          return !initialDataLoaded && deviceConnected && !deviceUnlocked
        }
      )
    },
    pureFeaturesVisible(models: StoreSelectors<any>) {
      return createSelector(
        models.basicInfo.deviceConnected,
        models.basicInfo.deviceUnlocked,
        models.basicInfo.updatingState,
        (deviceConnected, deviceUnlocked, updatingState) => {
          return (
            (deviceConnected && deviceUnlocked) ||
            updatingState === UpdatingState.Updating
          )
        }
      )
    },
  }),
})

export default basicInfo
