/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { flags } from "App/feature-flags/helpers/feature-flag.helpers"
import { Feature } from "App/feature-flags/constants"

test("returns some feature toggle values for current environment", () => {
  expect(flags.get(Feature.LoggerEnabled)).toBeTruthy()
  expect(flags.get(Feature.LogsScrubbed)).toBeFalsy()
})
