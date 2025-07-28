/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppUpdaterState } from "./app-updater-state"

interface SetAppUpdaterCheckErrorPayload {
  error: true
}

interface SetAppUpdaterCheckSuccessPayload extends AppUpdaterState {
  error?: false
}

export type SetAppUpdaterCheckPayload =
  | SetAppUpdaterCheckErrorPayload
  | SetAppUpdaterCheckSuccessPayload
  | null
