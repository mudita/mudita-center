/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Template } from "App/templates/dto"
import { reorder } from "App/templates/helpers/templates-order.helpers"

const template: Template = {
  id: "1",
  text: "Hello world!",
  lastUsedAt: "2",
  order: 1,
}

const secondTemplate: Template = {
  id: "2",
  text: "Test template",
  lastUsedAt: "1574335694",
  order: 2,
}

const thirdTemplate: Template = {
  id: "3",
  text: "Test template third",
  lastUsedAt: "157433569",
  order: 3,
}

const updateTemplateOrderMock = jest.fn()
describe("`reorder` function", () => {
  const list: Template[] = [template, secondTemplate, thirdTemplate]
  test("calls updateTemplate order", () => {
    reorder(list, 0, 2, updateTemplateOrderMock)

    expect(updateTemplateOrderMock).toBeCalled()
  })
  test("returns only templates with changed order", () => {
    expect(reorder(list, 0, 2, updateTemplateOrderMock)).toEqual([
      template,
      secondTemplate,
      thirdTemplate,
    ])
    expect(reorder(list, 0, 1, updateTemplateOrderMock)).toEqual([
      template,
      secondTemplate,
    ])
    expect(reorder(list, 2, 1, updateTemplateOrderMock)).toEqual([
      secondTemplate,
      thirdTemplate,
    ])
  })
})
