/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "Core/device"
import { checkForForceUpdateNeed } from "Core/update/actions/check-for-force-update-need/check-for-force-update-need.action"
import { CheckForUpdateMode, UpdateOsEvent } from "Core/update/constants"
import { pendingAction } from "Core/__deprecated__/renderer/store/helpers"
import { AnyAction } from "redux"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"

jest.mock(
  "Core/update/actions/check-for-update/check-for-update.action",
  () => ({
    checkForUpdate: (payload: unknown) => ({
      type: pendingAction(UpdateOsEvent.CheckForUpdate),
      payload,
    }),
  })
)

jest.mock("Core/feature-flags/helpers/feature-flag.helpers", () => ({
  flags: {
    get: () => true,
  },
}))

test("action returns false for not fully loaded data", async () => {
  const mockStore = createMockStore([thunk])({
    device: {},
    settings: {},
  })

  const {
    meta: { requestId },
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
  } = await mockStore.dispatch(
    checkForForceUpdateNeed() as unknown as AnyAction
  )

  expect(mockStore.getActions()).toEqual([
    checkForForceUpdateNeed.pending(requestId),
    checkForForceUpdateNeed.fulfilled(false, requestId),
  ])
})

test("action returns false for having os version equal or higher than the lowest supported", async () => {
  const mockStore = createMockStore([thunk])({
    device: {
      data: {
        osVersion: "1.5.0",
      },
      deviceType: DeviceType.MuditaPure,
    },
    settings: {
      lowestSupportedVersions: {
        lowestSupportedProductVersion: {
          [DeviceType.MuditaPure]: "1.5.0",
          [DeviceType.MuditaHarmony]: "1.6.0",
        },
      },
    },
  })

  const {
    meta: { requestId },
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
  } = await mockStore.dispatch(
    checkForForceUpdateNeed() as unknown as AnyAction
  )

  expect(mockStore.getActions()).toEqual([
    checkForForceUpdateNeed.pending(requestId),
    checkForForceUpdateNeed.fulfilled(false, requestId),
  ])
})

describe("when os version is lower than the lowest supported os version", () => {
  test("action returns true and dispatches check for update action", async () => {
    const mockStore = createMockStore([thunk])({
      device: {
        data: {
          osVersion: "1.5.0",
        },
        deviceType: DeviceType.MuditaPure,
      },
      settings: {
        lowestSupportedVersions: {
          lowestSupportedProductVersion: {
            [DeviceType.MuditaPure]: "1.6.0",
            [DeviceType.MuditaHarmony]: "1.6.0",
          },
        },
      },
    })

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(
      checkForForceUpdateNeed() as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      checkForForceUpdateNeed.pending(requestId),
      {
        type: pendingAction(UpdateOsEvent.CheckForUpdate),
        payload: {
          deviceType: DeviceType.MuditaPure,
          mode: CheckForUpdateMode.Normal,
        },
      },
      checkForForceUpdateNeed.fulfilled(true, requestId),
    ])
  })
})
