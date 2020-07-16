import { init } from "@rematch/core"
import templates, { createTemplate } from "Renderer/models/templates/templates"
import { templates as mockData } from "Renderer/components/core/table/table.fake-data"
import { Template } from "Renderer/modules/messages/tabs/templates-ui.component"

let store = init({
  models: { templates },
})

beforeEach(() => {
  store = init({
    models: { templates },
  })
})

const testId = "test-id"
const testContent = "test-content"
const testObject = { id: testId, content: testContent }

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

test("properly creates templates without provided data", () => {
  const newTemplate = createTemplate()
  expect(typeof newTemplate.id).toBe("string")
  expect(newTemplate.content).toBe("")
})

test("properly creates templates with provided data", () => {
  const newTemplate = createTemplate(testId, testContent)

  expect(newTemplate).toMatchObject(testObject)
})

test("properly saves new templates", () => {
  const currentNewestTemplate = store.getState().templates.templates![0]
  const currentTemplatesCount = store.getState().templates.templates!.length

  store.dispatch.templates.createNewTemplate()

  expect(store.getState().templates.templates![0]).not.toMatchObject(
    currentNewestTemplate
  )
  expect(store.getState().templates.templates!.length).toBe(
    currentTemplatesCount + 1
  )
})

test("properly fires callback", () => {
  const mockCb = jest.fn()

  store.dispatch.templates.createNewTemplate(mockCb)

  expect(mockCb).toBeCalled()
})

test("properly saves modified template", () => {
  const templateId = store.getState().templates.templates![0].id
  const findById = ({ id }: Template) => id === templateId

  expect(
    store.getState().templates.templates!.find(findById)!.content
  ).not.toBe(testContent)

  store.dispatch.templates.saveTemplate({
    id: templateId,
    content: testContent,
  })

  expect(store.getState().templates.templates!.find(findById)!.content).toBe(
    testContent
  )
})
