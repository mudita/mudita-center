/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { fulfilledAction } from "Renderer/store/helpers"
import { PayloadAction } from "@reduxjs/toolkit"
import {
  templateReducer,
  initialState,
} from "App/templates/reducers/template.reducer"
import { Template } from "App/templates/dto"
import { DataSyncEvent } from "App/data-sync/constants"
import { TemplatesEvent, TemplateDeletingState } from "App/templates/constants"

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
})
