/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { fulfilledAction } from "Renderer/store/helpers"
import {
  templateReducer,
  initialState,
} from "App/templates/reducers/template.reducer"

import { DataSyncEvent } from "App/data-sync/constants"

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
