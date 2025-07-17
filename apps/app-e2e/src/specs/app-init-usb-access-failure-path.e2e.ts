/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  itBehavesLikeProcessingModal,
  itBehavesLikeRequestCancelledModal,
  itBehavesLikeRequestModal,
  simulateAppInitUsbAccessStep,
} from "../helpers/usb-access.helper"
import { SPEC_TITLE } from "../consts/spec-title"

describe(SPEC_TITLE.APP_INIT_USB_ACCESS_FAILURE_PATH, () => {
  before(async () => {
    await simulateAppInitUsbAccessStep({
      serialPortAccess: false,
      grantAccessToSerialPortResult: false,
    })
  })

  itBehavesLikeRequestModal()
  itBehavesLikeProcessingModal()
  itBehavesLikeRequestCancelledModal()
})
