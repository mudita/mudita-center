/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import { Result } from "App/core/builder"
import { AppError } from "App/core/errors"
import {
  OsReleaseType,
  Product,
  ReleaseProcessState,
  UpdateError,
  UpdateErrorServiceErrors,
  UpdateOsEvent,
} from "App/update/constants"
import { OsRelease } from "App/update/dto"
import * as startOsUpdateRequestModule from "App/update/requests/start-os-update.request"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { pendingAction } from "App/__deprecated__/renderer/store/helpers"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { startUpdateOs } from "./start-update-os.action"
import * as removeDownloadedOsUpdatesModule from "App/update/requests/remove-downloaded-os-updates.request"
import {
  trackOsUpdate,
  TrackOsUpdateState,
} from "App/analytic-data-tracker/helpers"
import { DeviceType } from "App/device"

jest.mock("App/update/requests/remove-downloaded-os-updates.request")
jest.mock("App/device/requests/set-updating.request")
jest.mock("App/analytic-data-tracker/helpers/track-os-update")

jest.mock("App/device-file-system", () => ({
  removeFile: jest.fn().mockReturnValue({
    type: pendingAction("DEVICE_FILE_SYSTEM_REMOVE"),
    payload: undefined,
  }),
}))

const mockedRelease: OsRelease = {
  date: "2021-02-02",
  file: {
    name: "test-file",
    size: 123,
    url: "some-url",
  },
  product: Product.PurePhone,
  type: OsReleaseType.Daily,
  version: "1.1.0",
  mandatoryVersions: [],
}

const mockedRelease2: OsRelease = {
  date: "2021-02-02",
  file: {
    name: "test file",
    size: 123,
    url: "some-url",
  },
  product: Product.PurePhone,
  type: OsReleaseType.Daily,
  version: "1.2.0",
  mandatoryVersions: [],
}

const params = {
  releases: [mockedRelease, mockedRelease2],
}

const getParamsForSettingIntallingRelaseStateAction = (
  version: string,
  progressState: ReleaseProcessState
) => {
  return {
    type: UpdateOsEvent.SetStateForInstalledRelease,
    payload: {
      state: progressState,
      version,
    },
  }
}

describe("when `deviceType` is a null", () => {
  const mockStore = createMockStore([thunk])({
    device: {
      deviceType: null,
      data: {
        batteryLevel: 0.39,
        osVersion: "1.0.0",
      },
    },
  })

  test("the action is rejected", async () => {
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(startUpdateOs(params) as unknown as AnyAction)

    const error = new AppError(
      UpdateError.UpdateOsProcess,
      "deviceType is a null"
    )

    expect(mockStore.getActions()).toEqual([
      startUpdateOs.pending(requestId, params),
      startUpdateOs.rejected(testError, requestId, params, error),
    ])
  })

  test("`trackOsUpdate` shouldn't be called", async () => {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await mockStore.dispatch(startUpdateOs(params) as unknown as AnyAction)

    expect(trackOsUpdate).not.toHaveBeenCalled()
  })
})

describe("when battery is lower than 40%", () => {
  const mockStore = createMockStore([thunk])({
    device: {
      deviceType: DeviceType.MuditaPure,
      data: {
        batteryLevel: 0.39,
        osVersion: "1.0.0",
      },
    },
  })

  test("the action is rejected", async () => {
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(startUpdateOs(params) as unknown as AnyAction)

    const error = new AppError(
      UpdateError.TooLowBattery,
      "Device has too low battery level"
    )

    expect(mockStore.getActions()).toEqual([
      startUpdateOs.pending(requestId, params),
      startUpdateOs.rejected(testError, requestId, params, error),
    ])
  })

  test("`trackOsUpdate` shouldn't be called", async () => {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await mockStore.dispatch(startUpdateOs(params) as unknown as AnyAction)

    expect(trackOsUpdate).not.toHaveBeenCalled()
  })
})

describe("when all updating os requests return success status", () => {
  let removeDownloadedUpdatesSpy: jest.SpyInstance
  const mockStore = createMockStore([thunk])({
    device: {
      deviceType: DeviceType.MuditaPure,
      data: {
        batteryLevel: 0.52,
        osVersion: "1.0.0",
      },
    },
  })

  beforeEach(() => {
    removeDownloadedUpdatesSpy = jest
      .spyOn(removeDownloadedOsUpdatesModule, "removeDownloadedOsUpdates")
      .mockImplementation()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test("action is fulfilled", async () => {
    jest
      .spyOn(startOsUpdateRequestModule, "startOsUpdate")
      .mockResolvedValue(Result.success(true))
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(startUpdateOs(params) as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      startUpdateOs.pending(requestId, params),
      {
        payload: undefined,
        type: "DEVICE_FILE_SYSTEM_REMOVE/pending",
      },
      getParamsForSettingIntallingRelaseStateAction(
        "1.1.0",
        ReleaseProcessState.InProgress
      ),
      getParamsForSettingIntallingRelaseStateAction(
        "1.1.0",
        ReleaseProcessState.Done
      ),
      getParamsForSettingIntallingRelaseStateAction(
        "1.2.0",
        ReleaseProcessState.InProgress
      ),
      getParamsForSettingIntallingRelaseStateAction(
        "1.2.0",
        ReleaseProcessState.Done
      ),
      startUpdateOs.fulfilled(undefined, requestId, params),
    ])
  })

  test("clearing downloaded os should be requested", async () => {
    jest
      .spyOn(startOsUpdateRequestModule, "startOsUpdate")
      .mockResolvedValue(Result.success(true))

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await mockStore.dispatch(startUpdateOs(params) as unknown as AnyAction)

    expect(removeDownloadedUpdatesSpy).toHaveBeenCalledTimes(1)
  })

  test("`trackOsUpdate` should be called", async () => {
    jest
      .spyOn(startOsUpdateRequestModule, "startOsUpdate")
      .mockResolvedValue(Result.success(true))

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await mockStore.dispatch(startUpdateOs(params) as unknown as AnyAction)

    expect(trackOsUpdate).toHaveBeenCalledWith({
      deviceType: DeviceType.MuditaPure,
      fromOsVersion: "1.0.0",
      toOsVersion: "1.1.0",
      state: TrackOsUpdateState.Success,
    })
  })
})

describe("when updating os request return failure status", () => {
  const mockStore = createMockStore([thunk])({
    device: {
      deviceType: DeviceType.MuditaPure,
      data: {
        batteryLevel: 0.52,
        osVersion: "1.0.0",
      },
    },
  })

  test("action is rejected", async () => {
    jest
      .spyOn(startOsUpdateRequestModule, "startOsUpdate")
      .mockResolvedValueOnce(
        Result.failed(
          new AppError(UpdateErrorServiceErrors.CannotGetDeviceInfo, "")
        )
      )

    const error = new AppError(
      UpdateError.UpdateOsProcess,
      "Device updating process failed"
    )

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(startUpdateOs(params) as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      startUpdateOs.pending(requestId, params),
      {
        payload: undefined,
        type: "DEVICE_FILE_SYSTEM_REMOVE/pending",
      },
      getParamsForSettingIntallingRelaseStateAction(
        "1.1.0",
        ReleaseProcessState.InProgress
      ),
      startUpdateOs.rejected(testError, requestId, params, error),
    ])
  })

  test("`trackOsUpdate` should be called", async () => {
    jest
      .spyOn(startOsUpdateRequestModule, "startOsUpdate")
      .mockResolvedValueOnce(
        Result.failed(
          new AppError(UpdateErrorServiceErrors.CannotGetDeviceInfo, "")
        )
      )

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await mockStore.dispatch(startUpdateOs(params) as unknown as AnyAction)

    expect(trackOsUpdate).toHaveBeenCalledWith({
      deviceType: DeviceType.MuditaPure,
      fromOsVersion: "1.0.0",
      toOsVersion: "1.1.0",
      state: TrackOsUpdateState.Fail,
    })
  })
})
