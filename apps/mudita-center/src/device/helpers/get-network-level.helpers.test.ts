/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { getActiveNetworkLevelFromSim } from "./get-network-level.helpers"
import { SimCard } from "App/__deprecated__/renderer/models/basic-info/basic-info.typings"

const simCardMock: SimCard[] = [
  {
    network: "Network #1",
    networkLevel: 5,
    number: 1,
    slot: 1,
    active: true,
  },
  {
    network: "Network #2",
    networkLevel: 100,
    number: 1,
    slot: 1,
    active: false,
  },
]

test("returns the carrier network level from active sim card", () => {
  expect(getActiveNetworkLevelFromSim(simCardMock)).toEqual("5")
})

test("returns `No connection` if sim card list is empty", () => {
  expect(getActiveNetworkLevelFromSim([])).toEqual("No connection")
})
