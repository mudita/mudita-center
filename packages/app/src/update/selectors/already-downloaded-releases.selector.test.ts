/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { updateOsReducer, initialState } from "App/update/reducers"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { alreadyDownloadedReleasesSelector } from "App/update/selectors/already-downloaded-releases.selector"
import { OsRelease } from "App/update/dto"
import {
  OsReleaseType,
  Product,
  ReleaseProcessState,
} from "App/update/constants"

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

test("returns empty array for no updated releases", () => {
  const state = {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    update: updateOsReducer(initialState, {} as any),
  } as ReduxRootState
  expect(alreadyDownloadedReleasesSelector(state)).toEqual([])
})

test('returns releases with "done" state', () => {
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
        },
      },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {} as any
    ),
  } as ReduxRootState
  expect(alreadyDownloadedReleasesSelector(state)).toMatchInlineSnapshot(`
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
