import { renderHook, act } from "@testing-library/react-hooks"
import useSort from "Renderer/utils/hooks/use-sort"

const fakeData = [
  { id: 1, name: "A" },
  { id: 5, name: "C" },
  { id: 3, name: "B" },
]

test("properly sorts data", () => {
  const SORT_KEY = "name"
  const { result } = renderHook(() => useSort(fakeData))

  act(() => {
    result.current.sort(SORT_KEY)
  })

  expect(SORT_KEY in result.current.sortDir).toBeTruthy()
  expect(result.current.sortDir[SORT_KEY]).toBeTruthy()

  expect(result.current.data[0]).toMatchObject(fakeData[1])
  expect(result.current.data[1]).toMatchObject(fakeData[2])
  expect(result.current.data[2]).toMatchObject(fakeData[0])

  act(() => {
    result.current.sort(SORT_KEY)
  })

  expect(result.current.sortDir[SORT_KEY]).toBeFalsy()

  expect(result.current.data[0]).toMatchObject(fakeData[0])
  expect(result.current.data[1]).toMatchObject(fakeData[2])
  expect(result.current.data[2]).toMatchObject(fakeData[1])
})
