/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { MusicEvent } from "Renderer/modules/music/event.enum"
import { MusicState } from "Renderer/modules/music/music.reducer"

export const setState = createAction<Partial<MusicState>>(
  MusicEvent.SetState
)
