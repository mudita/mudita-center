/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { pendingAction, rejectedAction, fulfilledAction } from "./action.helper"

const actionMock = "THE_ACTION"

test("pendingAction return the action name with `pending` suffix", () => {
  expect(pendingAction(actionMock)).toEqual("THE_ACTION/pending")
})

test("rejectedAction return the action name with `rejected` suffix", () => {
  expect(rejectedAction(actionMock)).toEqual("THE_ACTION/rejected")
})

test("fulfilledAction return the action name with `fulfilled` suffix", () => {
  expect(fulfilledAction(actionMock)).toEqual("THE_ACTION/fulfilled")
})
