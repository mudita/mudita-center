/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { CaseColor, DeviceEvent } from "App/device/constants"
import {
  HarmonyDeviceData,
  OsVersionPayload,
  PureDeviceData,
} from "App/device/reducers/device.interface"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import {
  setOnboardingStatus,
  setDeviceData,
  setInitState,
  setLockTime,
  setOsVersionData,
  setSimData,
} from "./base.action"

const mockStore = createMockStore([thunk])()

const pureDeviceMock: PureDeviceData = {
  networkName: "Network",
  networkLevel: "5",
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
  serialNumber: "303",
  phoneLockTime: 1630703219,
  memorySpace: {
    reservedSpace: 124,
    usedUserSpace: 1021,
    total: 16000000000,
  },
  caseColour: CaseColor.Gray,
  backupFilePath: "path/to/directory/fileBase.tar",
}

const harmonyDeviceMock: HarmonyDeviceData = {
  osVersion: "0.75.1",
  batteryLevel: 0.99,
  serialNumber: "303",
  memorySpace: {
    reservedSpace: 124,
    usedUserSpace: 1021,
    total: 1021,
  },
}

const osVersionMock: OsVersionPayload = {
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
    mockStore.dispatch(setLockTime({ phoneLockTime: 123456789 }))
    expect(mockStore.getActions()).toEqual([
      {
        type: DeviceEvent.SetLockTime,
        payload: { phoneLockTime: 123456789 },
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

describe("Action: setInitState", () => {
  test("fire action with `SetInitState` type", () => {
    mockStore.dispatch(setInitState())
    expect(mockStore.getActions()).toEqual([
      {
        type: DeviceEvent.SetInitState,
        payload: undefined,
      },
    ])
  })
})

describe("Action: setOnboardingStatus", () => {
  test("fire action with `OnboardingStatus` type with provided payload", () => {
    mockStore.dispatch(setOnboardingStatus(true))
    expect(mockStore.getActions()).toEqual([
      {
        type: DeviceEvent.OnboardingStatus,
        payload: true,
      },
    ])

    mockStore.clearActions()

    mockStore.dispatch(setOnboardingStatus(false))
    expect(mockStore.getActions()).toEqual([
      {
        type: DeviceEvent.OnboardingStatus,
        payload: false,
      },
    ])
  })
})
