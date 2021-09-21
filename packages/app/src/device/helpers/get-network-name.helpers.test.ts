/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { getActiveNetworkFromSim } from "./get-network-name.helpers"
import { SimCard } from "Renderer/models/basic-info/basic-info.typings"

const simCardMock: SimCard[] = [
  {
    network: "Network",
    networkLevel: 1,
    number: 1,
    slot: 1,
    active: true,
  },
]

test("returns the carrier network name if sim card data provided", () => {
  expect(getActiveNetworkFromSim(simCardMock)).toEqual("Network")
})

test("returns `No connection` if sim card list is empty", () => {
  expect(getActiveNetworkFromSim([])).toEqual("No connection")
})
