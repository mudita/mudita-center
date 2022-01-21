/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { displaySpace } from "App/files-manager/helpers/display-space"

const MBvalue = 124
const GBvalue = 15000
test("DisplaySpace should return MB", () => {
  const result = displaySpace(MBvalue)
  expect(result).toEqual("124 MB")
})

test("DisplaySpace should return GB", () => {
  const result = displaySpace(GBvalue)
  expect(result).toEqual("15.0 GB")
})
