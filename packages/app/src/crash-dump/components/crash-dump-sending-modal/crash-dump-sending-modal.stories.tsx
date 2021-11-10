/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { storiesOf } from "@storybook/react"
import { CrashDumpSendingModal } from "App/crash-dump/components/crash-dump-sending-modal/crash-dump-sending-modal.component"


storiesOf("Crash Dump/Modals", module).add("Sending", () => (
  <CrashDumpSendingModal
    open
  />
))
