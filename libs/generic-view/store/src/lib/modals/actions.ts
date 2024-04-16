/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { Modal } from "./reducer"
import { ActionName } from "../action-names"

export const openModal = createAction<Modal>(ActionName.OpenModal)
export const closeModal = createAction<Modal>(ActionName.CloseModal)
export const closeAllModals = createAction(ActionName.CloseAllModals)
export const replaceModal = createAction<Modal>(ActionName.ReplaceModal)
export const closeDomainModals = createAction<Required<Pick<Modal, "domain">>>(
  ActionName.CloseDomainModals
)
