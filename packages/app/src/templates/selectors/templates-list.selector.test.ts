/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { templatesListSelector } from "App/templates/selectors/templates-list.selector"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { templateReducer, initialState } from "App/templates/reducers"
import { Template } from "App/templates/dto"

const template: Template = {
  id: "1",
  text: "Hello world!",
  lastUsedAt: "2",
  order: 1,
}

const secondTemplate: Template = {
  id: "2",
  text: "Hello world! Second text",
  lastUsedAt: "2",
  order: 2,
}

describe("`templatesListSelector` selector", () => {
  test("when initial state is set selector returns undefined", () => {
    const state = {
      templates: templateReducer(undefined, {} as any),
    } as unknown as ReduxRootState
    expect(templatesListSelector(state)).toEqual([])
  })

  test("when there are multiple templates selector returns them ascending by order", () => {
    const state = {
      templates: templateReducer(
        { ...initialState, data: [secondTemplate, template] },
        {} as any
      ),
    } as ReduxRootState
    expect(templatesListSelector(state)).toEqual([template, secondTemplate])
  })
})
