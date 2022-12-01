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
  setInitState,
  setAgreementStatus,
} from "./base.action"
import { DeviceEvent, UpdatingState } from "App/device/constants"
import { CaseColour } from "@mudita/pure"

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
  caseColour: CaseColour.Gray,
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

describe("Action: setAgreementStatus", () => {
  test("fire action with `AgreementStatus` type with provided payload", () => {
    mockStore.dispatch(setAgreementStatus(true))
    expect(mockStore.getActions()).toEqual([
      {
        type: DeviceEvent.AgreementStatus,
        payload: true,
      },
    ])

    mockStore.clearActions()

    mockStore.dispatch(setAgreementStatus(false))
    expect(mockStore.getActions()).toEqual([
      {
        type: DeviceEvent.AgreementStatus,
        payload: false,
      },
    ])
  })
})
