/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { noop } from "Renderer/utils/noop"
import RecoveryModeUI from "Renderer/modules/recovery-mode/recovery-mode-ui.component"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import React from "react"
import { contactSupport } from "Renderer/utils/contact-support/contact-support"

const RecoveryMode: FunctionComponent<{}> = () => {
  return (
    <RecoveryModeUI
      onBackupClick={noop}
      onRebootOsClick={noop}
      onRestoreClick={noop}
      onFactoryResetClick={noop}
      onSupportButtonClick={contactSupport}
    />
  )
}

export default RecoveryMode
