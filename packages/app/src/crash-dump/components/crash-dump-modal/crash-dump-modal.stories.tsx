/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { DeviceType } from "@mudita/pure"
import { CrashDumpModal } from "App/crash-dump/components/crash-dump-modal/crash-dump-modal.component"

storiesOf("Crash Dump/Modals", module).add("Information", () => (
  <CrashDumpModal
    open
    deviceType={DeviceType.MuditaPure}
    onClose={action("Close")}
    onAccept={action("Accept")}
  />
))
