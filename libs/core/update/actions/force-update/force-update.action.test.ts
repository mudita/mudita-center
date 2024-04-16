/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError } from "Core/core/errors"
import * as downloadUpdatesActionModule from "Core/update/actions/download-updates/download-updates.action"
import { forceUpdate } from "Core/update/actions/force-update/force-update.action"
import * as startUpdatesActionModule from "Core/update/actions/start-update-os/start-update-os.action"
import {
  OsReleaseType,
  Product,
  UpdateError,
  UpdateOsEvent,
} from "Core/update/constants"
import { OsRelease } from "Core/update/dto"
import { testError } from "Core/__deprecated__/renderer/store/constants"
import {
  fulfilledAction,
  rejectedAction,
} from "Core/__deprecated__/renderer/store/helpers"
import { AnyAction } from "redux"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"

const releases: OsRelease[] = [
  {
    date: "2021-02-02",
    file: {
      name: "test file",
      size: 123,
      url: "some-url",
    },
    product: Product.PurePhone,
    type: OsReleaseType.Production,
    version: "1.1.0",
    mandatoryVersions: [],
  },
  {
    date: "2021-02-03",
    file: {
      name: "test file 2",
      size: 1234,
      url: "some-url-2",
    },
    product: Product.PurePhone,
    type: OsReleaseType.Production,
    version: "1.2.0",
    mandatoryVersions: [],
  },
]

const params = { releases }

describe("happy path", () => {
  beforeEach(() => {
    jest
      .spyOn(downloadUpdatesActionModule, "downloadUpdates")
      .mockImplementation(
        () =>
          ({
            type: fulfilledAction(UpdateOsEvent.DownloadUpdate),
          } as unknown as jest.Mock)
      )
    jest.spyOn(startUpdatesActionModule, "startUpdateOs").mockImplementation(
      () =>
        ({
          type: fulfilledAction(UpdateOsEvent.StartOsUpdateProcess),
        } as unknown as jest.Mock)
    )
  })

  test("downloadUpdates and startUpdateOs actions are dispatched", async () => {
    const mockStore = createMockStore([thunk])({
      device: {},
      settings: {},
    })

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(forceUpdate(params) as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      forceUpdate.pending(requestId, params),
      {
        type: fulfilledAction(UpdateOsEvent.DownloadUpdate),
      },
      {
        type: fulfilledAction(UpdateOsEvent.StartOsUpdateProcess),
      },
      forceUpdate.fulfilled(undefined, requestId, params),
    ])
  })
})

describe("when downloadUpdates action fails", () => {
  const error = new AppError(UpdateError.UnexpectedDownloadError, "Oups 2")
  beforeEach(() => {
    jest
      .spyOn(downloadUpdatesActionModule, "downloadUpdates")
      .mockImplementation(
        () =>
          ({
            type: rejectedAction(UpdateOsEvent.DownloadUpdate),
            payload: error,
          } as unknown as jest.Mock)
      )
  })

  test("action is rejected", async () => {
    const mockStore = createMockStore([thunk])({
      device: {},
      settings: {},
    })

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(forceUpdate(params) as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      forceUpdate.pending(requestId, params),
      {
        type: rejectedAction(UpdateOsEvent.DownloadUpdate),
        payload: error,
      },
      forceUpdate.rejected(testError, requestId, params, error),
    ])
  })
})

describe("when startUpdateOs action fails", () => {
  const error = new AppError(UpdateError.TooLowBattery, "Oups")

  beforeEach(() => {
    jest
      .spyOn(downloadUpdatesActionModule, "downloadUpdates")
      .mockImplementation(
        () =>
          ({
            type: fulfilledAction(UpdateOsEvent.DownloadUpdate),
          } as unknown as jest.Mock)
      )
    jest.spyOn(startUpdatesActionModule, "startUpdateOs").mockImplementation(
      () =>
        ({
          type: rejectedAction(UpdateOsEvent.StartOsUpdateProcess),
          payload: error,
        } as unknown as jest.Mock)
    )
  })

  test("action is rejected", async () => {
    const mockStore = createMockStore([thunk])({
      device: {},
      settings: {},
    })

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(forceUpdate(params) as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      forceUpdate.pending(requestId, params),
      {
        type: fulfilledAction(UpdateOsEvent.DownloadUpdate),
      },
      {
        type: rejectedAction(UpdateOsEvent.StartOsUpdateProcess),
        payload: error,
      },
      forceUpdate.rejected(testError, requestId, params, error),
    ])
  })
})
