/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { init } from "@rematch/core"
import { makeNewTemplate } from "Renderer/models/templates/templates"
import { Template } from "Renderer/modules/messages/tabs/templates.component"
import templates from "Renderer/models/templates/templates"
import { templatesSeed, todaysTemplate } from "App/seeds/templates"
import selectPlugin from "@rematch/select"
import { SortOrder } from "Common/enums/sort-order.enum"

const storeConfig = {
  models: { templates },
  plugins: [selectPlugin()],
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
  expect(store.getState().templates.templates).toBeDefined()
  expect(store.getState().templates.searchValue).toBe("")
  expect(store.getState().templates.templates?.length).toBe(
    templatesSeed.templates.length
  )
})

test("properly removes items", () => {
  const lookupId = templatesSeed.templates[0].id
  expect(
    store
      .getState()
      .templates.templates?.find(({ id }: Template) => id === lookupId)
  ).toBeDefined()
  store.dispatch.templates.removeTemplates([lookupId])
  expect(
    store
      .getState()
      .templates.templates?.find(({ id }: Template) => id === lookupId)
  ).toBeUndefined()
})

test("returns untouched collection when wrong ids are passed", () => {
  expect(store.getState().templates.templates?.length).toBe(
    templatesSeed.templates.length
  )
  store.dispatch.templates.removeTemplates(["non", "existent"])
  expect(store.getState().templates.templates?.length).toBe(
    templatesSeed.templates.length
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
    date: testDate,
  })

  expect(store.getState().templates.templates!.find(findById)!.content).toBe(
    testContent
  )
})

test("today's template is at the beginning of the list by default, after toggle is placed at the last place in the list", () => {
  const state = store.getState()
  const templatesList = store.select.templates.filteredList(state)
  expect(state.templates.sortOrder).toEqual(SortOrder.Descending)
  expect(todaysTemplate).toMatchObject(templatesList[0])

  store.dispatch.templates.changeSortOrder(SortOrder.Ascending)

  const stateAfterToggle = store.getState()
  const templatesListAfterToggle = store.select.templates.filteredList(
    stateAfterToggle
  )
  expect(stateAfterToggle.templates.sortOrder).toEqual(SortOrder.Ascending)
  expect(todaysTemplate).toMatchObject(
    templatesListAfterToggle[templatesListAfterToggle.length - 1]
  )
})
