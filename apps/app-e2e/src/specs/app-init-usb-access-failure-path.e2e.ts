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
import testsHelper from "../helpers/tests.helper"

describe("App Init Step - Usb Access - Failure Path", () => {
  before(async function () {
    if (!testsHelper.isLinux()) {
      this.skip()
    }
    await simulateAppInitUsbAccessStep({
      serialPortAccess: false,
      grantAccessToSerialPortResult: false,
    })
  })

  itBehavesLikeRequestModal()
  itBehavesLikeProcessingModal()
  itBehavesLikeRequestCancelledModal()
})
