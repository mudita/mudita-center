/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppResultFactory } from "app-utils/models"
import { ExecuteTransferFn } from "devices/common/models"
import { ApiDevice } from "devices/api-device/models"

export const mtpUploadFiles: ExecuteTransferFn<ApiDevice> = async (_params) => {
  return AppResultFactory.success({})
}
