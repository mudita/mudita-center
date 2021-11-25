/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { ModalsManagerEvent } from "App/modals-manager/constants"
import { ModalKey } from "App/modals-manager/reducers"

export const hideModals = createAction(ModalsManagerEvent.HideModals)

export const showModal = createAction<ModalKey>(
  ModalsManagerEvent.ShowModal
)
