/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { isError } from "App/__deprecated__/common/helpers/is-error.helpers"

describe("`isError` helper", () => {
  test("returns false if the passed argument isn't an Error", () => {
    expect(isError(undefined)).toBeFalsy()
  })
  test("returns true if the passed argument is an Error", () => {
    expect(isError(new Error())).toBeTruthy()
  })
})
