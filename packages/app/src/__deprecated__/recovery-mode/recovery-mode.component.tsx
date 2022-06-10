/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import RecoveryModeUI from "App/__deprecated__/recovery-mode/recovery-mode-ui.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { noop } from "App/__deprecated__/renderer/utils/noop"

interface Props {
  openContactSupportFlow: () => void
}

const RecoveryMode: FunctionComponent<Props> = ({ openContactSupportFlow }) => {
  return (
    <RecoveryModeUI
      onBackupClick={noop}
      onRebootOsClick={noop}
      onRestoreClick={noop}
      onFactoryResetClick={noop}
      onSupportButtonClick={openContactSupportFlow}
    />
  )
}

export default RecoveryMode
