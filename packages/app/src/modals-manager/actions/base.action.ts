/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { ModalStateKey } from "App/modals-manager/reducers"
import { ModalsManagerEvent } from "App/modals-manager/constants"

export const hideModals = createAction(ModalsManagerEvent.HideModals)

export const showModal = createAction<ModalStateKey>(
  ModalsManagerEvent.ShowModal
)
