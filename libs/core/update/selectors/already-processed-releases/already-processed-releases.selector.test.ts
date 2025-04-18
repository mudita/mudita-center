/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { updateOsReducer, initialState } from "Core/update/reducers"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  alreadyProcessedReleasesSelector,
  Mode,
} from "Core/update/selectors/already-processed-releases/already-processed-releases.selector"
import { OsRelease } from "Core/update/dto"
import {
  OsReleaseType,
  Product,
  ReleaseProcessState,
} from "Core/update/constants"

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

describe("downloaded releases mode", () => {
  test("returns empty array for no updated releases", () => {
    const state = {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      update: updateOsReducer(initialState, {} as any),
    } as ReduxRootState
    expect(
      alreadyProcessedReleasesSelector(Mode.DownloadedReleases)(state)
    ).toEqual([])
  })

  test('returns downloaded releases with "done" state', () => {
    const state = {
      update: updateOsReducer(
        {
          ...initialState,
          data: {
            ...initialState.data,
            downloadedProcessedReleases: [
              {
                release: { ...mockedRelease, version: "1.0.0" },
                state: ReleaseProcessState.Done,
              },
              {
                release: { ...mockedRelease, version: "1.1.0" },
                state: ReleaseProcessState.InProgress,
              },
              {
                release: { ...mockedRelease, version: "1.2.0" },
                state: ReleaseProcessState.Initial,
              },
            ],
            updateProcessedReleases: [
              {
                release: { ...mockedRelease, version: "2.0.0" },
                state: ReleaseProcessState.Done,
              },
              {
                release: { ...mockedRelease, version: "2.1.0" },
                state: ReleaseProcessState.InProgress,
              },
              {
                release: { ...mockedRelease, version: "2.2.0" },
                state: ReleaseProcessState.Initial,
              },
            ],
          },
        },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {} as any
      ),
    } as ReduxRootState
    expect(alreadyProcessedReleasesSelector(Mode.DownloadedReleases)(state))
      .toMatchInlineSnapshot(`
          Array [
            Object {
              "date": "2021-02-02",
              "file": Object {
                "name": "test file",
                "size": 123,
                "url": "some-url",
              },
              "mandatoryVersions": Array [],
              "product": "PurePhone",
              "type": "daily",
              "version": "1.0.0",
            },
          ]
      `)
  })
})
describe("installed releases mode", () => {
  test("returns empty array for no updated releases", () => {
    const state = {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      update: updateOsReducer(initialState, {} as any),
    } as ReduxRootState
    expect(
      alreadyProcessedReleasesSelector(Mode.InstalledReleases)(state)
    ).toEqual([])
  })

  test('returns installed releases with "done" state', () => {
    const state = {
      update: updateOsReducer(
        {
          ...initialState,
          data: {
            ...initialState.data,
            downloadedProcessedReleases: [
              {
                release: { ...mockedRelease, version: "1.0.0" },
                state: ReleaseProcessState.Done,
              },
              {
                release: { ...mockedRelease, version: "1.1.0" },
                state: ReleaseProcessState.InProgress,
              },
              {
                release: { ...mockedRelease, version: "1.2.0" },
                state: ReleaseProcessState.Initial,
              },
            ],
            updateProcessedReleases: [
              {
                release: { ...mockedRelease, version: "2.0.0" },
                state: ReleaseProcessState.Done,
              },
              {
                release: { ...mockedRelease, version: "2.1.0" },
                state: ReleaseProcessState.InProgress,
              },
              {
                release: { ...mockedRelease, version: "2.2.0" },
                state: ReleaseProcessState.Initial,
              },
            ],
          },
        },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {} as any
      ),
    } as ReduxRootState
    expect(alreadyProcessedReleasesSelector(Mode.InstalledReleases)(state))
      .toMatchInlineSnapshot(`
      Array [
        Object {
          "date": "2021-02-02",
          "file": Object {
            "name": "test file",
            "size": 123,
            "url": "some-url",
          },
          "mandatoryVersions": Array [],
          "product": "PurePhone",
          "type": "daily",
          "version": "2.0.0",
        },
      ]
    `)
  })
})
