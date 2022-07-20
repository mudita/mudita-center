/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { AppError } from "App/core/errors"
import { DataSyncEvent } from "App/data-sync/constants"
import { TemplateError, TemplatesEvent } from "App/templates/constants"
import { Template } from "App/templates/dto"
import {
  initialState,
  templateReducer,
} from "App/templates/reducers/template.reducer"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "App/__deprecated__/renderer/store/helpers"

const createTemplateErrorMock = new AppError(
  TemplateError.CreateTemplate,
  "I'm error"
)
const updateTemplateErrorMock = new AppError(
  TemplateError.UpdateTemplate,
  "Luke, I'm your error"
)
const updateTemplateOrderErrorMock = new AppError(
  TemplateError.UpdateTemplateOrder,
  "I'm error"
)
const templateMock: Template = {
  id: "1",
  text: "Hello world",
  lastUsedAt: "2",
  order: 1,
}
const templateUpdatePayloadMock: Template = {
  id: "1",
  text: "Hello updated world",
  lastUsedAt: "2",
  order: 1,
}

const template: Template = {
  id: "1",
  text: "Test template",
  lastUsedAt: "1574335694",
  order: 1,
}

const secondTemplate: Template = {
  id: "2",
  text: "Test template second",
  lastUsedAt: "157433569",
  order: 2,
}

const thirdTemplate: Template = {
  id: "3",
  text: "Test template second",
  lastUsedAt: "157433569",
  order: 3,
}

const templateUpdateOrderPayloadMock: Template[] = [
  {
    id: "1",
    text: "Test template",
    lastUsedAt: "1574335694",
    order: 4,
  },
]

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

describe("Update template functionality", () => {
  test("Event: UpdateTemplate/pending changed `loading` to `true` and `loaded` to `false`", () => {
    expect(
      templateReducer(undefined, {
        type: pendingAction(TemplatesEvent.UpdateTemplate),
        payload: undefined,
      })
    ).toEqual({
      ...initialState,
      loaded: false,
      loading: true,
    })
  })

  test("Event: UpdateTemplate/rejected changed `loading` to `false` and `loaded` to `false` and set error message", () => {
    expect(
      templateReducer(undefined, {
        type: rejectedAction(TemplatesEvent.UpdateTemplate),
        payload: updateTemplateErrorMock,
      })
    ).toEqual({
      ...initialState,
      error: "Luke, I'm your error",
      loaded: false,
      loading: false,
    })
  })

  test("Event: UpdateTemplate/fulfilled changed `loading` to `false` and `loaded` to `true` and update template to state", () => {
    expect(
      templateReducer(
        {
          ...initialState,
          data: [templateMock],
        },
        {
          type: fulfilledAction(TemplatesEvent.UpdateTemplate),
          payload: templateUpdatePayloadMock,
        }
      )
    ).toEqual({
      ...initialState,
      data: [templateUpdatePayloadMock],
      loaded: true,
      loading: false,
    })
  })

  test("Event: UpdateTemplate/fulfilled clears error state", () => {
    expect(
      templateReducer(
        {
          ...initialState,
          data: [templateMock],
          error: "Some error",
        },
        {
          type: fulfilledAction(TemplatesEvent.UpdateTemplate),
          payload: templateUpdatePayloadMock,
        }
      )
    ).toEqual({
      ...initialState,
      data: [templateUpdatePayloadMock],
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
      loading: false,
      loaded: true,
      deleting: true,
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
      loading: false,
      loaded: true,
      deleting: true,
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
      loading: true,
      loaded: false,
      deleting: true,
    })
  })

  test("Event: DeleteTemplate/rejected changed `deletingState` to `Fail`", () => {
    const deleteTemplateErrorMock = new AppError(
      TemplateError.DeleteTemplate,
      "I'm error"
    )

    expect(
      templateReducer(undefined, {
        type: rejectedAction(TemplatesEvent.DeleteTemplates),
        payload: deleteTemplateErrorMock,
      })
    ).toEqual({
      ...initialState,
      loading: false,
      loaded: false,
      deleting: true,
      error: "I'm error",
    })
  })

  describe("Update template order functionality", () => {
    test("Event: UpdateTemplateOrder/pending changed `loading` to `true` and `loaded` to `false`", () => {
      expect(
        templateReducer(undefined, {
          type: pendingAction(TemplatesEvent.UpdateTemplateOrder),
          payload: undefined,
        })
      ).toEqual({
        ...initialState,
        loaded: false,
        loading: true,
      })
    })

    test("Event: UpdateTemplateOrder/rejected changed `loading` to `false` and `loaded` to `false` and set error message", () => {
      expect(
        templateReducer(undefined, {
          type: rejectedAction(TemplatesEvent.UpdateTemplateOrder),
          payload: updateTemplateOrderErrorMock,
        })
      ).toEqual({
        ...initialState,
        error: "I'm error",
        loaded: false,
        loading: false,
      })
    })

    test("Event: UpdateTemplateOrder/fulfilled changed `loading` to `false` and `loaded` to `true` and update template to state", () => {
      expect(
        templateReducer(
          {
            ...initialState,
            data: [template, secondTemplate, thirdTemplate],
          },
          {
            type: fulfilledAction(TemplatesEvent.UpdateTemplateOrder),
            payload: templateUpdateOrderPayloadMock,
          }
        )
      ).toEqual({
        ...initialState,
        data: [
          secondTemplate,
          thirdTemplate,
          ...templateUpdateOrderPayloadMock,
        ],
        loaded: true,
        loading: false,
      })
    })

    test("Event: UpdateTemplateOrder/fulfilled clears error state", () => {
      expect(
        templateReducer(
          {
            ...initialState,
            data: [template],
            error: "Some error",
          },
          {
            type: fulfilledAction(TemplatesEvent.UpdateTemplateOrder),
            payload: templateUpdateOrderPayloadMock,
          }
        )
      ).toEqual({
        ...initialState,
        data: [...templateUpdateOrderPayloadMock],
        error: null,
        loaded: true,
        loading: false,
      })
    })
  })
})
