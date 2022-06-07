/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import {
  pendingAction,
  fulfilledAction,
  rejectedAction,
} from "Renderer/store/helpers"
import {
  templateReducer,
  initialState,
} from "App/templates/reducers/template.reducer"
import { CreateTemplateError, DeleteTemplateError } from "App/templates/errors"
import { Template } from "App/templates/dto"
import { DataSyncEvent } from "App/data-sync/constants"
import { TemplatesEvent, TemplateDeletingState } from "App/templates/constants"

const createTemplateErrorMock = new CreateTemplateError("I'm error")
const templateMock: Template = {
  id: "1",
  text: "Hello world",
  lastUsedAt: "2",
}

describe("Create template functionality", () => {
  test("Event: CreateTemplate/pending changed `loading` to `true` and `loaded` to `false`", () => {
    expect(
      templateReducer(undefined, {
        type: pendingAction(TemplatesEvent.CreateTemplate),
        payload: undefined,
      })
    ).toEqual({
      ...initialState,
      loaded: false,
      loading: true,
    })
  })

  test("Event: CreateTemplate/rejected changed `loading` to `false` and `loaded` to `false` and set error message", () => {
    expect(
      templateReducer(undefined, {
        type: rejectedAction(TemplatesEvent.CreateTemplate),
        payload: createTemplateErrorMock,
      })
    ).toEqual({
      ...initialState,
      error: "I'm error",
      loaded: false,
      loading: false,
    })
  })

  test("Event: CreateTemplate/fulfilled changed `loading` to `false` and `loaded` to `true` push new template to state", () => {
    expect(
      templateReducer(undefined, {
        type: fulfilledAction(TemplatesEvent.CreateTemplate),
        payload: templateMock,
      })
    ).toEqual({
      ...initialState,
      data: [templateMock],
      loaded: true,
      loading: false,
    })
  })

  test("Event: CreateTemplate/fulfilled clears error state", () => {
    expect(
      templateReducer(
        {
          ...initialState,
          error: "Some error",
        },
        {
          type: fulfilledAction(TemplatesEvent.CreateTemplate),
          payload: templateMock,
        }
      )
    ).toEqual({
      ...initialState,
      data: [templateMock],
      error: null,
      loaded: true,
      loading: false,
    })
  })
})

describe("ReadAllIndexes data functionality", () => {
  test("Event: ReadAllIndexes/fulfilled change `resultState` to Loaded", () => {
    expect(
      templateReducer(undefined, {
        type: fulfilledAction(DataSyncEvent.ReadAllIndexes),
        payload: {
          templates: {
            "1": {
              id: "1",
              lastUsedAt: "4",
              text: "Thanks for reaching out. I can't talk right now, I'll call you later",
            },
          },
        },
      })
    ).toEqual({
      ...initialState,
      data: [
        {
          id: "1",
          lastUsedAt: "4",
          text: "Thanks for reaching out. I can't talk right now, I'll call you later",
        },
      ],
    })
  })
})

describe("Delete Template data functionality", () => {
  const template: Template = {
    id: "1",
    text: "Test template",
    lastUsedAt: "1574335694",
  }

  const secondTemplate: Template = {
    id: "2",
    text: "Test template second",
    lastUsedAt: "157433569",
  }

  const thirdTemplate: Template = {
    id: "3",
    text: "Test template second",
    lastUsedAt: "157433569",
  }

  test("Event: DeleteTemplate update properly one data field", () => {
    const deleteTemplatesAction: PayloadAction<string[]> = {
      type: fulfilledAction(TemplatesEvent.DeleteTemplates),
      payload: [template.id],
    }

    expect(
      templateReducer(
        {
          ...initialState,
          data: [template],
        },
        deleteTemplatesAction
      )
    ).toEqual({
      ...initialState,
      data: [],
      deletingState: TemplateDeletingState.Success,
    })
  })
  test("Event: DeleteTemplate update properly data field when more than one template is deleting", () => {
    const deleteTemplatesAction: PayloadAction<string[]> = {
      type: fulfilledAction(TemplatesEvent.DeleteTemplates),
      payload: [template.id, thirdTemplate.id],
    }

    expect(
      templateReducer(
        {
          ...initialState,
          data: [template, secondTemplate, thirdTemplate],
        },
        deleteTemplatesAction
      )
    ).toEqual({
      ...initialState,
      data: [secondTemplate],
      deletingState: TemplateDeletingState.Success,
    })
  })

  test("Event: DeleteTemplate/pending changed `deletingState` to `Deleting`", () => {
    expect(
      templateReducer(undefined, {
        type: pendingAction(TemplatesEvent.DeleteTemplates),
        payload: undefined,
      })
    ).toEqual({
      ...initialState,
      deletingState: TemplateDeletingState.Deleting,
    })
  })

  test("Event: DeleteTemplate/rejected changed `deletingState` to `Fail`", () => {
    const deleteTemplateErrorMock = new DeleteTemplateError("I'm error")

    expect(
      templateReducer(undefined, {
        type: rejectedAction(TemplatesEvent.DeleteTemplates),
        payload: deleteTemplateErrorMock,
      })
    ).toEqual({
      ...initialState,
      deletingState: TemplateDeletingState.Fail,
    })
  })
})
