/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import {
  PureDeviceData,
  HarmonyDeviceData,
  OsVersionPayload,
} from "App/device/reducers/device.interface"
import {
  setDeviceData,
  setLockTime,
  setSimData,
  setOsVersionData,
  setUpdateState,
} from "./base.action"
import { DeviceEvent, UpdatingState } from "App/device/constants"

const mockStore = createMockStore([thunk])()

const pureDeviceMock: PureDeviceData = {
  networkName: "Network",
  networkLevel: "5",
  osUpdateDate: "2020-01-14T11:31:08.244Z",
  osVersion: "0.75.1",
  batteryLevel: 0.99,
  simCards: [
    {
      slot: 1,
      active: true,
      number: 12345678,
      network: "",
      networkLevel: 0.75,
    },
  ],
  lastBackup: {
    createdAt: "2020-01-14T11:31:08.244Z",
    size: 100,
  },
  serialNumber: "303",
  phoneLockTime: 1630703219,
  memorySpace: {
    free: 124,
    full: 1021,
  },
}

const harmonyDeviceMock: HarmonyDeviceData = {
  osUpdateDate: "2020-01-14T11:31:08.244Z",
  osVersion: "0.75.1",
  batteryLevel: 0.99,
  serialNumber: "303",
  memorySpace: {
    free: 124,
    full: 1021,
  },
}

const osVersionMock: OsVersionPayload = {
  osUpdateDate: "2021-01-14T11:31:08.244Z",
  osVersion: "7.7.7",
}

afterEach(() => {
  mockStore.clearActions()
})

describe("Action: setDeviceData", () => {
  test("fire action with `Pure Device` payload and `SetData` type", () => {
    mockStore.dispatch(setDeviceData(pureDeviceMock))
    expect(mockStore.getActions()).toEqual([
      {
        type: DeviceEvent.SetData,
        payload: pureDeviceMock,
      },
    ])
  })

  test("fire action with `Harmony Device` payload and `SetData` type", () => {
    mockStore.dispatch(setDeviceData(harmonyDeviceMock))
    expect(mockStore.getActions()).toEqual([
      {
        type: DeviceEvent.SetData,
        payload: harmonyDeviceMock,
      },
    ])
  })
})

describe("Action: setLockTime", () => {
  test("fire action with device lock time and `SetLockTime` type", () => {
    mockStore.dispatch(setLockTime(123456789))
    expect(mockStore.getActions()).toEqual([
      {
        type: DeviceEvent.SetLockTime,
        payload: 123456789,
      },
    ])
  })
})

describe("Action: setSimData", () => {
  test("fire action with sim card number which should be activated and `SetSimData` type", () => {
    mockStore.dispatch(setSimData(1))
    expect(mockStore.getActions()).toEqual([
      {
        type: DeviceEvent.SetSimData,
        payload: 1,
      },
    ])
  })
})

describe("Action: setOsVersionData", () => {
  test("fire action with newer os version data and `SetOsVersionData` type", () => {
    mockStore.dispatch(setOsVersionData(osVersionMock))
    expect(mockStore.getActions()).toEqual([
      {
        type: DeviceEvent.SetOsVersionData,
        payload: osVersionMock,
      },
    ])
  })
})

describe("Action: setUpdateState", () => {
  test("fire action with `Updating` state and `SetUpdateState` type", () => {
    mockStore.dispatch(setUpdateState(UpdatingState.Updating))
    expect(mockStore.getActions()).toEqual([
      {
        type: DeviceEvent.SetUpdateState,
        payload: UpdatingState.Updating,
      },
    ])
  })

  test("fire action with `Success` state and `SetUpdateState` type", () => {
    mockStore.dispatch(setUpdateState(UpdatingState.Success))
    expect(mockStore.getActions()).toEqual([
      {
        type: DeviceEvent.SetUpdateState,
        payload: UpdatingState.Success,
      },
    ])
  })

  test("fire action with `Standby` state and `SetUpdateState` type", () => {
    mockStore.dispatch(setUpdateState(UpdatingState.Standby))
    expect(mockStore.getActions()).toEqual([
      {
        type: DeviceEvent.SetUpdateState,
        payload: UpdatingState.Standby,
      },
    ])
  })

  test("fire action with `Fail` state and `SetUpdateState` type", () => {
    mockStore.dispatch(setUpdateState(UpdatingState.Fail))
    expect(mockStore.getActions()).toEqual([
      {
        type: DeviceEvent.SetUpdateState,
        payload: UpdatingState.Fail,
      },
    ])
  })
})
