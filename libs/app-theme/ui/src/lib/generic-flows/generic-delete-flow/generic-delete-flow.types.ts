/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FailedItem } from "../../generic-modals/generic-failed-modal"

export type GenericDeleteItem = FailedItem

export enum GenericDeleteFlowState {
  ConfirmDelete = "ConfirmDelete",
  Deleting = "Deleting",
  DeleteFailed = "DeleteFailed",
}
