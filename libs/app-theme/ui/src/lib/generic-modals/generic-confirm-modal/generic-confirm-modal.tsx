/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { GenericConfirmModalProps } from "./generic-confirm-modal.types"
import { GenericConfirmModalLayout } from "./generic-confirm-modal-layout"

export const GenericConfirmModal: FunctionComponent<
  GenericConfirmModalProps
> = (props) => {
  return <GenericConfirmModalLayout {...props} />
}
