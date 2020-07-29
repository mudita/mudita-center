import { renderHook, act } from "@testing-library/react-hooks"
import useSort from "Renderer/utils/hooks/use-sort/use-sort"
import { SortDirection } from "Renderer/utils/hooks/use-sort/use-sort.types"

const fakeData = [
  { id: 1, name: "A" },
  { id: 5, name: "C" },
  { id: 3, name: "B" },
]

test("data is sorted properly", () => {
  const SORT_KEY = "name"
  const { result } = renderHook(() => useSort(fakeData))

  act(() => {
    result.current.sort(SORT_KEY, fakeData)
  })

  expect(result.current.data.length).toBe(fakeData.length)

  expect(SORT_KEY in result.current.sortDirection).toBeTruthy()
  expect(result.current.sortDirection[SORT_KEY]).toBe(SortDirection.Descending)

  expect(result.current.data[0]).toMatchObject(fakeData[1])
  expect(result.current.data[1]).toMatchObject(fakeData[2])
  expect(result.current.data[2]).toMatchObject(fakeData[0])

  act(() => {
    result.current.sort(SORT_KEY, fakeData)
  })

  expect(result.current.sortDirection[SORT_KEY]).toBe(SortDirection.Ascending)

  expect(result.current.data[0]).toMatchObject(fakeData[0])
  expect(result.current.data[1]).toMatchObject(fakeData[2])
  expect(result.current.data[2]).toMatchObject(fakeData[1])
})

test("doesn't modify the original data", () => {
  const SORT_KEY = "name"
  const newData = [...fakeData]
  const { result } = renderHook(() => useSort(newData))

  act(() => {
    result.current.sort(SORT_KEY, fakeData)
  })

  expect(result.current.data[0]).not.toMatchObject(newData[0])
  expect(result.current.data[1]).not.toMatchObject(newData[1])
  expect(result.current.data[2]).not.toMatchObject(newData[2])
})
