import { init } from "@rematch/core"
import templates from "Renderer/models/templates/templates"
import { templates as mockData } from "Renderer/components/core/table/table.fake-data"

let store = init({
  models: { templates },
})

beforeEach(() => {
  store = init({
    models: { templates },
  })
})

test("has proper initial state", () => {
  expect(store.getState().templates.templates).toBeDefined()
  expect(store.getState().templates.searchValue).toBe("")
  expect(store.getState().templates.templates?.length).toBe(mockData.length)
})

test("properly removes items", () => {
  const lookupId = mockData[0].id
  expect(
    store.getState().templates.templates?.find(({ id }) => id === lookupId)
  ).toBeDefined()
  store.dispatch.templates.removeItems([lookupId])
  expect(
    store.getState().templates.templates?.find(({ id }) => id === lookupId)
  ).toBeUndefined()
})

test("returns untouched collection when wrong ids are passed", () => {
  expect(store.getState().templates.templates?.length).toBe(mockData.length)
  store.dispatch.templates.removeItems(["non", "existent"])
  expect(store.getState().templates.templates?.length).toBe(mockData.length)
})
