import { renderHook } from "@testing-library/react-hooks"
import { useTemporaryStorage } from "Renderer/utils/hooks/use-temporary-storage/use-temporary-storage.hook"

const testObject = {
  id: "abc123",
  value: {
    foo: "baz1",
    bar: "baz2",
  },
}

test("data is stored and retrieved properly", () => {
  const { result } = renderHook(() => useTemporaryStorage(testObject.id))

  result.current.set(testObject.value)
  expect(result.current.get()).toStrictEqual(testObject.value)
})

test("data is updated properly", () => {
  const { result } = renderHook(() => useTemporaryStorage(testObject.id))

  result.current.set(testObject.value)
  expect(result.current.get()).toStrictEqual(testObject.value)
  result.current.set("test")
  expect(result.current.get()).toBe("test")
})

test("data is removed properly", () => {
  const { result } = renderHook(() => useTemporaryStorage(testObject.id))

  result.current.remove()
  expect(result.current.get()).toBe(undefined)
})

test("default data is restored properly", () => {
  const { result } = renderHook(() =>
    useTemporaryStorage(testObject.id, testObject.value)
  )

  result.current.remove()
  expect(result.current.get()).toBe(testObject.value)
})
