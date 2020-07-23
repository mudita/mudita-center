import { HookResult, renderHook } from "@testing-library/react-hooks"
import {
  useTemporaryStorage,
  UseTemporaryStorageHook,
} from "Renderer/utils/hooks/use-temporary-storage/use-temporary-storage.hook"

const testObject = {
  id: "abc123",
  value: {
    foo: "baz1",
    bar: "baz2",
  },
}

let result: HookResult<UseTemporaryStorageHook<typeof testObject.value>>

beforeEach(() => {
  ;({ result } = renderHook(() => useTemporaryStorage(testObject.id)))
})

test("temporary object is not created on init", () => {
  expect(result.current.getTemporaryValue()).toBeUndefined()
})

test("temporary data is stored properly", () => {
  result.current.setTemporaryValue(testObject.value)
  expect(result.current.getTemporaryValue()).toStrictEqual(testObject.value)
})

test("temporary data is updated properly", () => {
  const newObject = { foo: "bar1", bar: "bar2" }

  result.current.setTemporaryValue(testObject.value)
  expect(result.current.getTemporaryValue()).toStrictEqual(testObject.value)

  result.current.setTemporaryValue(newObject)
  expect(result.current.getTemporaryValue()).toStrictEqual(newObject)
})

test("temporary data is removed properly", () => {
  result.current.setTemporaryValue(testObject.value)
  result.current.removeTemporaryValue()
  expect(result.current.getTemporaryValue()).toBeUndefined()
})

test("default data is returned properly", () => {
  ;({ result } = renderHook(() =>
    useTemporaryStorage(testObject.id, testObject.value)
  ))
  expect(result.current.getTemporaryValue()).toStrictEqual(testObject.value)
})
