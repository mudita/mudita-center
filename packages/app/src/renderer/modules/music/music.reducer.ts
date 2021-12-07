/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "Renderer/store/helpers/action.helper"
import { MusicEvent } from "Renderer/modules/music/event.enum"

export interface MusicState {
  files: any[]
}

export const initialState: MusicState = {
  files: [],
}

export const musicReducer = createReducer<MusicState>(
  initialState,
  (builder) => {
    builder
      .addCase(pendingAction(MusicEvent.MtpConnect), (state) => {
        return {
          ...state,
        }
      })
      .addCase(fulfilledAction(MusicEvent.MtpConnect), (state) => {
        return {
          ...state,
          files: [
            { name: "test.txt", size: 20 },
            { name: "test-2.txt", size: 26 },
            { name: "test-3.txt", size: 5 },
          ],
        }
      })
      .addCase(rejectedAction(MusicEvent.MtpConnect), (state) => {
        return {
          ...state,
        }
      })
  }
)
