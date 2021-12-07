/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "Renderer/store/helpers/action.helper"
import { MusicEvent } from "Renderer/modules/music/event.enum"
import { FileInformation } from "Renderer/modules/music/mtp-connect.listener"

export enum ResultState {
  Loading,
  Loaded,
  Empty,
  Error,
}

export interface MusicState {
  state: ResultState
  files: FileInformation[]
}

export type SetStateAction = PayloadAction<
  Partial<MusicState>,
  MusicEvent.SetState
>

export const initialState: MusicState = {
  state: ResultState.Empty,
  files: [],
}

export const musicReducer = createReducer<MusicState>(
  initialState,
  (builder) => {
    builder
      .addCase(pendingAction(MusicEvent.MtpConnect), () => {
        return {
          ...initialState,
          state: ResultState.Loading,
        }
      })
      .addCase(fulfilledAction(MusicEvent.MtpConnect), (state) => {
        return {
          ...state,
          state: ResultState.Loaded,
        }
      })
      .addCase(rejectedAction(MusicEvent.MtpConnect), (state) => {
        return {
          ...state,
          state: ResultState.Error,
        }
      })

      .addCase(MusicEvent.SetState, (state, action: SetStateAction) => {
        return { ...state, ...action.payload }
      })
  }
)
