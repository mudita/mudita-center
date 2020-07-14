import { init } from "@rematch/core"
import templates from "Renderer/models/templates/templates"

import { templatesSeed } from "App/seeds/templates"

const storeConfig = {
  models: { templates },
  redux: {
    initialState: {
      templates: templatesSeed,
    },
  },
}

let store = init(storeConfig)

beforeEach(() => {
  store = init(storeConfig)
})

test("has proper initial state", () => {
  expect(store.getState().templates.templates).toBeDefined()
  expect(store.getState().templates.searchValue).toBe("")
  expect(store.getState().templates.templates?.length).toBe(
    templatesSeed.templates.length
  )
})

test("properly removes items", () => {
  const lookupId = templatesSeed.templates[0].id
  expect(
    store.getState().templates.templates?.find(({ id }) => id === lookupId)
  ).toBeDefined()
  store.dispatch.templates.removeItems([lookupId])
  expect(
    store.getState().templates.templates?.find(({ id }) => id === lookupId)
  ).toBeUndefined()
})

test("returns untouched collection when wrong ids are passed", () => {
  expect(store.getState().templates.templates?.length).toBe(
    templatesSeed.templates.length
  )
  store.dispatch.templates.removeItems(["non", "existent"])
  expect(store.getState().templates.templates?.length).toBe(
    templatesSeed.templates.length
  )
})
