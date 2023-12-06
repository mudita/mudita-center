/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Template } from "Core/templates/dto"
import { reorder } from "Core/templates/helpers/templates-order.helpers"

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

describe("`reorder` function", () => {
  const list: Template[] = [template, secondTemplate, thirdTemplate]
  test("sets new order values based on item position in the array", () => {
    expect(reorder(list)).toEqual([
      { ...template, order: 3 },
      { ...secondTemplate, order: 2 },
      { ...thirdTemplate, order: 1 },
    ])
  })
})
