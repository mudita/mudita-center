/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { DeviceType } from "Core/device/constants"
import { CrashDumpModal } from "Core/crash-dump/components/crash-dump-modal/crash-dump-modal.component"

storiesOf("Crash Dump/Modals", module).add("Information", () => (
  <CrashDumpModal
    open
    deviceType={DeviceType.MuditaPure}
    onClose={action("Close")}
    onSubmit={action("Submit")}
  />
))
