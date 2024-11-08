/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  OsReleaseType,
  Product,
  ReleaseProcessState,
} from "Core/update/constants"
import { OsRelease } from "Core/update/dto"
import { initialState, updateOsReducer } from "Core/update/reducers"
import { areAllReleasesDownloaded } from "Core/update/selectors/are-all-releases-downloaded/are-all-releases-downloaded.selector"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

jest.mock("history", () => ({
  createHashHistory: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    go: jest.fn(),
    block: jest.fn(),
    listen: jest.fn(),
    location: { pathname: "", search: "", hash: "", state: null },
  })),
}))

const mockedRelease: OsRelease = {
  date: "2021-02-02",
  file: {
    name: "test file",
    size: 123,
    url: "some-url",
  },
  product: Product.PurePhone,
  type: OsReleaseType.Daily,
  version: "1.0.0",
  mandatoryVersions: [],
}

describe("when all releases have status done", () => {
  test("the selector returns true", () => {
    const state = {
      update: updateOsReducer(
        {
          ...initialState,
          data: {
            ...initialState.data,
            downloadedProcessedReleases: [
              {
                release: { ...mockedRelease, version: "1.1.0" },
                state: ReleaseProcessState.Done,
              },
              {
                release: { ...mockedRelease, version: "1.2.0" },
                state: ReleaseProcessState.Done,
              },
            ],
          },
        },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {} as any
      ),
    } as ReduxRootState

    expect(areAllReleasesDownloaded(state)).toEqual(true)
  })
})

describe("when some of the releases have status different than done", () => {
  const state = {
    update: updateOsReducer(
      {
        ...initialState,
        data: {
          ...initialState.data,
          downloadedProcessedReleases: [
            {
              release: { ...mockedRelease, version: "1.1.0" },
              state: ReleaseProcessState.Done,
            },
            {
              release: { ...mockedRelease, version: "1.2.0" },
              state: ReleaseProcessState.InProgress,
            },
          ],
        },
      },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {} as any
    ),
  } as ReduxRootState

  expect(areAllReleasesDownloaded(state)).toEqual(false)
})

describe("when the releases are not defined", () => {
  test("the selector returns false", () => {
    const state = {
      update: updateOsReducer(
        {
          ...initialState,
          data: {
            ...initialState.data,
            downloadedProcessedReleases: [],
          },
        },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {} as any
      ),
    } as ReduxRootState

    expect(areAllReleasesDownloaded(state)).toEqual(false)
  })
})
