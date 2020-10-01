import { init } from "@rematch/core"
import { makeNewTemplate } from "Renderer/models/templates/templates"
import { Template } from "Renderer/modules/messages/tabs/templates.component"
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

const testId = "test-id"
const testContent = "test-content"
const testObject = { id: testId, content: testContent }
const testDate = new Date("2020-07-21T13:08:02.733Z")

test("has proper initial state", () => {
  expect(store.getState().templates.templatesList).toBeDefined()
  expect(store.getState().templates.searchValue).toBe("")
  expect(store.getState().templates.templatesList?.length).toBe(
    templatesSeed.templatesList.length
  )
})

test("properly removes items", () => {
  const lookupId = templatesSeed.templatesList[0].id
  expect(
    store.getState().templates.templatesList?.find(({ id }) => id === lookupId)
  ).toBeDefined()
  store.dispatch.templates.removeTemplates([lookupId])
  expect(
    store.getState().templates.templatesList?.find(({ id }) => id === lookupId)
  ).toBeUndefined()
})

test("returns untouched collection when wrong ids are passed", () => {
  expect(store.getState().templates.templatesList?.length).toBe(
    templatesSeed.templatesList.length
  )
  store.dispatch.templates.removeTemplates(["non", "existent"])
  expect(store.getState().templates.templatesList?.length).toBe(
    templatesSeed.templatesList.length
  )
})

test("properly creates templates without provided data", () => {
  const newTemplate = makeNewTemplate()
  expect(typeof newTemplate.id).toBe("string")
  expect(newTemplate.content).toBe("")
})

test("properly creates templates with provided data", () => {
  const newTemplate = makeNewTemplate(testId, testContent)

  expect(newTemplate).toMatchObject(testObject)
})

test("properly saves new templates", () => {
  const currentNewestTemplate = store.getState().templates.templatesList![0]
  const currentTemplatesCount = store.getState().templates.templatesList!.length

  store.dispatch.templates.createNewTemplate()

  expect(store.getState().templates.templatesList![0]).not.toMatchObject(
    currentNewestTemplate
  )
  expect(store.getState().templates.templatesList!.length).toBe(
    currentTemplatesCount + 1
  )
})

test("properly fires callback", () => {
  const mockCb = jest.fn()

  store.dispatch.templates.createNewTemplate(mockCb)

  expect(mockCb).toBeCalled()
})

test("properly saves modified template", () => {
  const templateId = store.getState().templates.templatesList![0].id
  const findById = ({ id }: Template) => id === templateId

  expect(
    store.getState().templates.templatesList!.find(findById)!.content
  ).not.toBe(testContent)

  store.dispatch.templates.saveTemplate({
    id: templateId,
    content: testContent,
    date: testDate,
  })

  expect(
    store.getState().templates.templatesList!.find(findById)!.content
  ).toBe(testContent)
})
