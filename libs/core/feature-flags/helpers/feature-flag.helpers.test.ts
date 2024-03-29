/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { flags } from "Core/feature-flags/helpers/feature-flag.helpers"
import { features } from "Core/feature-flags/features"

test("returns full list of available feature flags", () => {
  expect(Object.keys(flags.getAll()).length).toEqual(
    Object.keys(features).length
  )
})
