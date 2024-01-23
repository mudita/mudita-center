/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { Modal } from "./reducer"

export const openModal = createAction<Modal>("generic-modals/open-modal")
export const closeModal = createAction<Modal>("generic-modals/close-modal")
export const closeAllModals = createAction("generic-modals/close-all-modals")
export const replaceModal = createAction<Modal>("generic-modals/replace-modal")
export const closeDomainModals = createAction<Required<Pick<Modal, "domain">>>(
  "generic-modals/close-domain-modals"
)
