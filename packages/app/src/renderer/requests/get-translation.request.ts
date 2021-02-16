/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { TranslationEventResponse } from "Common/interfaces/translations.interface"
import { TranslationEvents } from "Common/enums/translations.enum"

export const getTranslation = (): Promise<TranslationEventResponse> => {
  return ipcRenderer.callMain(TranslationEvents.Get)
}
