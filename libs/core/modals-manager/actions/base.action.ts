/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { ModalsManagerItem, ModalStateKey } from "Core/modals-manager/reducers"
import { ModalsManagerEvent } from "Core/modals-manager/constants"

export const hideModals = createAction(ModalsManagerEvent.HideModals)
export const setVisibleModals = createAction<ModalsManagerItem[]>(ModalsManagerEvent.SetVisibleModals)

export const showModal = createAction<ModalStateKey>(
  ModalsManagerEvent.ShowModal
)
