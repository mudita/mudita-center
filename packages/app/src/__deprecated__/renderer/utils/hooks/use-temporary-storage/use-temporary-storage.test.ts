/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderHook } from "@testing-library/react-hooks"
import { useTemporaryStorage } from "App/__deprecated__/renderer/utils/hooks/use-temporary-storage/use-temporary-storage.hook"

const testObject = {
  id: "abc123",
  value: {
    foo: "baz1",
    bar: "baz2",
  },
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let result: any

beforeEach(() => {
  ;({ result } = renderHook(() => useTemporaryStorage(testObject.id)))
})

test("temporary object is not created on init", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  expect(result.current.getTemporaryValue()).toBeUndefined()
})

test("temporary data is stored properly", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  result.current.setTemporaryValue(testObject.value)
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  expect(result.current.getTemporaryValue()).toStrictEqual(testObject.value)
})

test("temporary data is updated properly", () => {
  const newObject = { foo: "bar1", bar: "bar2" }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  result.current.setTemporaryValue(testObject.value)
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  expect(result.current.getTemporaryValue()).toStrictEqual(testObject.value)

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  result.current.setTemporaryValue(newObject)
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  expect(result.current.getTemporaryValue()).toStrictEqual(newObject)
})

test("temporary data is removed properly", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  result.current.setTemporaryValue(testObject.value)
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  result.current.removeTemporaryValue()
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  expect(result.current.getTemporaryValue()).toBeUndefined()
})

test("default data is returned properly", () => {
  ;({ result } = renderHook(() =>
    useTemporaryStorage(testObject.id, testObject.value)
  ))
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  expect(result.current.getTemporaryValue()).toStrictEqual(testObject.value)
})
