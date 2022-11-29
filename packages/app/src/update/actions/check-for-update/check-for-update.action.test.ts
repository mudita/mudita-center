/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import { Result } from "App/core/builder"
import { AppError } from "App/core/errors"
import { DeviceType } from "App/device/constants"
import { checkForUpdate } from "App/update/actions"
import { Product, ReleaseType, UpdateError } from "App/update/constants"
import { Release } from "App/update/dto"
import * as getAllReleasesRequestModule from "App/update/requests/get-all-releases.request"
import * as getLatestReleaseRequestModule from "App/update/requests/get-latest-release.request"
import { testError } from "App/__deprecated__/renderer/store/constants"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"

const mockedRelease: Release = {
  date: "2021-02-02",
  file: {
    name: "test file",
    size: 123,
    url: "some-url",
  },
  product: Product.PurePhone,
  type: ReleaseType.Daily,
  version: "1.1.0",
}

const params = { deviceType: DeviceType.MuditaPure, isSilentCheck: false }

describe("when fetching latest release fails", () => {
  test("action is rejected", async () => {
    jest
      .spyOn(getLatestReleaseRequestModule, "getLatestReleaseRequest")
      .mockResolvedValueOnce(Result.failed(new AppError("", "")))

    jest
      .spyOn(getAllReleasesRequestModule, "getAllReleasesRequest")
      .mockResolvedValueOnce(Result.success([mockedRelease]))

    const mockStore = createMockStore([thunk])({
      device: {
        data: {
          osVersion: "1.2.0",
        },
      },
    })

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(checkForUpdate(params) as unknown as AnyAction)

    const error = new AppError(
      UpdateError.CheckForUpdate,
      "Latest release not found"
    )

    expect(mockStore.getActions()).toEqual([
      checkForUpdate.pending(requestId, params),
      checkForUpdate.rejected(testError, requestId, params, error),
    ])
  })
})

describe("when fetching all releases fails", () => {
  test("action is rejected", async () => {
    jest
      .spyOn(getLatestReleaseRequestModule, "getLatestReleaseRequest")
      .mockResolvedValueOnce(Result.success(mockedRelease))

    jest
      .spyOn(getAllReleasesRequestModule, "getAllReleasesRequest")
      .mockResolvedValueOnce(Result.failed(new AppError("", "")))

    const mockStore = createMockStore([thunk])({
      device: {
        data: {
          osVersion: "1.2.0",
        },
      },
    })

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(checkForUpdate(params) as unknown as AnyAction)

    const error = new AppError(
      UpdateError.CheckForUpdate,
      "All releases not found"
    )

    expect(mockStore.getActions()).toEqual([
      checkForUpdate.pending(requestId, params),
      checkForUpdate.rejected(testError, requestId, params, error),
    ])
  })
})

describe("when latest release os version is not greater than current os version", () => {
  test("action is fulfilled with empty available release", async () => {
    jest
      .spyOn(getLatestReleaseRequestModule, "getLatestReleaseRequest")
      .mockResolvedValueOnce(Result.success(mockedRelease))

    jest
      .spyOn(getAllReleasesRequestModule, "getAllReleasesRequest")
      .mockResolvedValueOnce(Result.success([mockedRelease]))

    const mockStore = createMockStore([thunk])({
      device: {
        data: {
          osVersion: "1.2.0",
        },
      },
    })

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(checkForUpdate(params) as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      checkForUpdate.pending(requestId, params),
      checkForUpdate.fulfilled(
        {
          allReleases: [mockedRelease],
          releaseAvailableForUpdate: null,
        },
        requestId,
        params
      ),
    ])
  })
})

describe("when latest release os version i greater than current os version", () => {
  test("action is fulfilled with available release", async () => {
    const newerRelease = { ...mockedRelease, version: "1.9.0" }
    jest
      .spyOn(getLatestReleaseRequestModule, "getLatestReleaseRequest")
      .mockResolvedValueOnce(Result.success(newerRelease))

    jest
      .spyOn(getAllReleasesRequestModule, "getAllReleasesRequest")
      .mockResolvedValueOnce(Result.success([mockedRelease]))

    const mockStore = createMockStore([thunk])({
      device: {
        data: {
          osVersion: "1.2.0",
        },
      },
    })

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(checkForUpdate(params) as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      checkForUpdate.pending(requestId, params),
      checkForUpdate.fulfilled(
        {
          allReleases: [mockedRelease],
          releaseAvailableForUpdate: newerRelease,
        },
        requestId,
        params
      ),
    ])
  })
})
