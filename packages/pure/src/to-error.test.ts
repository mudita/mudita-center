/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { toErrorWithMessage } from "./to-error"

describe("`toErrorWithMessage`", () => {
  test("error as string parsed to object with message", () => {
    expect(toErrorWithMessage("error as string").message).toEqual(
      '"error as string"'
    )
  })

  test("error as number parsed to object with message", () => {
    expect(toErrorWithMessage(0).message).toEqual("0")
  })

  test("error as unknown object parsed to object with message", () => {
    expect(toErrorWithMessage({ data: "some data" }).message).toEqual(
      '{"data":"some data"}'
    )
  })

  test("error as null object parsed to object with message", () => {
    expect(toErrorWithMessage(null).message).toEqual("null")
  })

  test("error as promise object parsed to object with message", () => {
    const promise = new Promise(() => {})
    expect(toErrorWithMessage(promise).message).toEqual("{}")
  })

  test("error as undefined object parsed to object with message", () => {
    expect(toErrorWithMessage(undefined).message).toEqual("")
  })
})
