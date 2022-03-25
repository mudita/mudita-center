/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { CaseColour, DeviceType } from "@mudita/pure"
import { deviceReducer, initialState } from "App/device/reducers/device.reducer"
import {
  PureDeviceData,
  HarmonyDeviceData,
} from "App/device/reducers/device.interface"
import {
  DeviceEvent,
  ConnectionState,
  UpdatingState,
} from "App/device/constants"
import {
  rejectedAction,
  fulfilledAction,
  pendingAction,
} from "App/renderer/store/helpers"
import {
  DeviceConnectionError,
  DeviceLoadingError,
  DeviceInvalidPhoneLockTimeError,
} from "App/device/errors"

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
    free: 124,
    full: 1021,
    total: 16000000000,
  },
  caseColour: CaseColour.Gray,
  backupLocation: "path/to/directory",
}

const harmonyDeviceMock: HarmonyDeviceData = {
  osVersion: "0.75.1",
  batteryLevel: 0.99,
  serialNumber: "303",
  memorySpace: {
    free: 124,
    full: 1021,
    total: 4000000000,
  },
}

test("empty event returns initial state", () => {
  expect(deviceReducer(undefined, {} as any)).toEqual(initialState)
})

describe("Connecting/Disconnecting functionality", () => {
  test("Event: Connected/pending set the deviceType and connected state", () => {
    expect(
      deviceReducer(undefined, {
        type: pendingAction(DeviceEvent.Connected),
        payload: DeviceType.MuditaPure,
      })
    ).toEqual({
      ...initialState,
      state: ConnectionState.Loading,
    })
  })

  test("Event: Connected/fulfilled set the deviceType and connected state", () => {
    expect(
      deviceReducer(undefined, {
        type: fulfilledAction(DeviceEvent.Connected),
        payload: DeviceType.MuditaPure,
      })
    ).toEqual({
      ...initialState,
      deviceType: DeviceType.MuditaPure,
    })
  })

  test("Event: Connected/rejected set error message and updates state to error", () => {
    const errorMock = new DeviceConnectionError("I'm error")

    expect(
      deviceReducer(undefined, {
        type: rejectedAction(DeviceEvent.Connected),
        payload: errorMock,
      })
    ).toEqual({
      ...initialState,
      state: ConnectionState.Error,
      error: errorMock,
    })
  })

  test("Event: Disconnected/pending returns initial state", () => {
    expect(
      deviceReducer(undefined, {
        type: pendingAction(DeviceEvent.Disconnected),
      })
    ).toEqual({
      ...initialState,
      state: ConnectionState.Loading,
    })
  })

  test("Event: Disconnected/fulfilled returns initial state", () => {
    expect(
      deviceReducer(undefined, {
        type: fulfilledAction(DeviceEvent.Disconnected),
      })
    ).toEqual(initialState)
  })

  test("Event: Disconnected/rejected set error message and updates state to error", () => {
    const errorMock = new DeviceConnectionError("I'm error")

    expect(
      deviceReducer(undefined, {
        type: rejectedAction(DeviceEvent.Disconnected),
        payload: errorMock,
      })
    ).toEqual({
      ...initialState,
      state: ConnectionState.Error,
      error: errorMock,
    })
  })

  test("Event: SetConnectionState/fulfilled set connection state to `true` if `true` payload is provided", () => {
    expect(
      deviceReducer(undefined, {
        type: fulfilledAction(DeviceEvent.SetConnectionState),
        payload: true,
      })
    ).toEqual({
      ...initialState,
      status: {
        ...initialState.status,
        connected: true,
      },
    })
  })

  test("Event: SetConnectionState/fulfilled set device state to initial if `false` payload is provided", () => {
    expect(
      deviceReducer(undefined, {
        type: fulfilledAction(DeviceEvent.SetConnectionState),
        payload: false,
      })
    ).toEqual({
      ...initialState,
    })
  })

  test("Event: SetConnectionState/fulfilled set device state to initial and `updatingState` to `Updating` if `false` payload is provided and current updating state is equal `UpdatingState.Updating`", () => {
    expect(
      deviceReducer(
        {
          ...initialState,
          updatingState: UpdatingState.Updating,
        },
        {
          type: fulfilledAction(DeviceEvent.SetConnectionState),
          payload: false,
        }
      )
    ).toEqual({
      ...initialState,
      updatingState: UpdatingState.Updating,
    })
  })
})

describe("Lock/Unlock functionality", () => {
  test("Event: Locked changed locked state to `true` if deviceType is equal to `MuditaPure`", () => {
    expect(
      deviceReducer(
        {
          ...initialState,
          deviceType: DeviceType.MuditaPure,
        },
        {
          type: fulfilledAction(DeviceEvent.Locked),
        }
      )
    ).toEqual({
      ...initialState,
      deviceType: DeviceType.MuditaPure,
      status: {
        ...initialState.status,
        unlocked: false,
      },
    })
  })

  test("Event: Locked changed unlocked state to `true` if deviceType is equal to `MuditaHarmony`", () => {
    expect(
      deviceReducer(
        {
          ...initialState,
          deviceType: DeviceType.MuditaHarmony,
        },
        {
          type: fulfilledAction(DeviceEvent.Locked),
        }
      )
    ).toEqual({
      ...initialState,
      deviceType: DeviceType.MuditaHarmony,
      status: {
        ...initialState.status,
        unlocked: true,
      },
    })
  })

  test("Event: Unlocked/fulfilled changed locked state to `true`", () => {
    expect(
      deviceReducer(
        {
          ...initialState,
          status: {
            ...initialState.status,
            unlocked: false,
          },
        },
        {
          type: fulfilledAction(DeviceEvent.Unlocked),
        }
      )
    ).toEqual({
      ...initialState,
      status: {
        ...initialState.status,
        unlocked: true,
      },
    })
  })

  test("Event: Unlocked/rejected set error with proper type", () => {
    const deviceConnectionErrorMock = new DeviceConnectionError("I'm error")
    const deviceInvalidPhoneLockTimeError = new DeviceInvalidPhoneLockTimeError(
      "I'm error"
    )

    expect(
      deviceReducer(undefined, {
        type: rejectedAction(DeviceEvent.Unlocked),
        payload: deviceConnectionErrorMock,
      })
    ).toEqual({
      ...initialState,
      state: ConnectionState.Error,
      error: deviceConnectionErrorMock,
    })

    expect(
      (
        deviceReducer(undefined, {
          type: rejectedAction(DeviceEvent.Unlocked),
          payload: deviceConnectionErrorMock,
        }).error as DeviceConnectionError
      ).type
    ).toEqual(deviceConnectionErrorMock.type)

    expect(
      (
        deviceReducer(undefined, {
          type: rejectedAction(DeviceEvent.Unlocked),
          payload: deviceInvalidPhoneLockTimeError,
        }).error as DeviceInvalidPhoneLockTimeError
      ).type
    ).toEqual(deviceInvalidPhoneLockTimeError.type)
  })

  test("Event: SetLockTime set deviceLockTime", () => {
    expect(
      deviceReducer(undefined, {
        type: DeviceEvent.SetLockTime,
        payload: 123,
      })
    ).toEqual({
      ...initialState,
      data: {
        ...initialState.data,
        phoneLockTime: 123,
      },
    })
  })
})

describe("Set device data functionality", () => {
  test("Event: SetData set Mudita Pure data from received from `payload`", () => {
    expect(
      deviceReducer(undefined, {
        type: DeviceEvent.SetData,
        payload: pureDeviceMock,
      })
    ).toEqual({
      ...initialState,
      data: {
        networkLevel: "5",
        networkName: "Network",
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
          free: 124,
          full: 1021,
          total: 16000000000,
        },
        caseColour: CaseColour.Gray,
        backupLocation: "path/to/directory",
      },
    })
  })

  test("Event: SetData set Mudita Harmony data from received from `payload`", () => {
    expect(
      deviceReducer(undefined, {
        type: DeviceEvent.SetData,
        payload: harmonyDeviceMock,
      })
    ).toEqual({
      ...initialState,
      data: {
        osVersion: "0.75.1",
        batteryLevel: 0.99,
        serialNumber: "303",
        memorySpace: {
          free: 124,
          full: 1021,
          total: 4000000000,
        },
      },
    })
  })
})

describe("Updates loading functionality", () => {
  test("Event: Loading/pending change `state` to Loading", () => {
    expect(
      deviceReducer(undefined, {
        type: pendingAction(DeviceEvent.Loading),
      })
    ).toEqual({
      ...initialState,
      state: ConnectionState.Loading,
    })
  })

  test("Event: Loading/fulfilled change `state` to Loaded", () => {
    expect(
      deviceReducer(undefined, {
        type: fulfilledAction(DeviceEvent.Loading),
      })
    ).toEqual({
      ...initialState,
      status: {
        ...initialState.status,
        loaded: true,
      },
      state: ConnectionState.Loaded,
    })
  })

  test("Event: Loading/rejected change `state` to Loaded", () => {
    const errorMock = new DeviceLoadingError("I'm error")

    expect(
      deviceReducer(undefined, {
        type: rejectedAction(DeviceEvent.Loading),
        payload: errorMock,
      })
    ).toEqual({
      ...initialState,
      state: ConnectionState.Error,
      error: errorMock,
    })
  })
})

describe("Update sim card data", () => {
  test("Event: SetSimData set the new active sim card", () => {
    expect(
      deviceReducer(
        {
          ...initialState,
          deviceType: DeviceType.MuditaPure,
          data: {
            ...initialState.data,
            simCards: [
              {
                slot: 1,
                active: true,
                number: 12345678,
                network: "",
                networkLevel: 0.75,
              },
              {
                slot: 2,
                active: false,
                number: 87654321,
                network: "",
                networkLevel: 0.75,
              },
            ],
          },
        },
        {
          type: DeviceEvent.SetSimData,
          payload: 87654321,
        }
      )
    ).toEqual({
      ...initialState,
      deviceType: DeviceType.MuditaPure,
      data: {
        ...initialState.data,
        simCards: [
          {
            slot: 1,
            active: false,
            number: 12345678,
            network: "",
            networkLevel: 0.75,
          },
          {
            slot: 2,
            active: true,
            number: 87654321,
            network: "",
            networkLevel: 0.75,
          },
        ],
      },
    })
  })
})

describe("Update functionality", () => {
  test("Event: SetOsVersionData set osVersion and osUpdateData to `data` field", () => {
    expect(
      deviceReducer(undefined, {
        type: DeviceEvent.SetOsVersionData,
        payload: {
          osVersion: "7.7.7",
        },
      })
    ).toEqual({
      ...initialState,
      data: {
        ...initialState.data,
        osVersion: "7.7.7",
      },
    })
  })

  test("Event: SetOsVersionData replaces existing osVersion and osUpdateData with received from `payload`", () => {
    expect(
      deviceReducer(
        {
          ...initialState,
          data: {
            ...initialState.data,
            osVersion: "0.0.0",
          },
        },
        {
          type: DeviceEvent.SetOsVersionData,
          payload: {
            osVersion: "7.7.7",
          },
        }
      )
    ).toEqual({
      ...initialState,
      data: {
        ...initialState.data,
        osVersion: "7.7.7",
      },
    })
  })
})
