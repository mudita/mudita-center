import { noop } from "Renderer/utils/noop"
import RecoveryModeUI from "Renderer/modules/recovery-mode/recovery-mode-ui.component"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import React from "react"

const RecoveryMode: FunctionComponent<{}> = () => (
  <RecoveryModeUI
    onBackupClick={noop}
    onRebootOsClick={noop}
    onRestoreClick={noop}
    onFactoryResetClick={noop}
    onSupportButtonClick={noop}
  />
)

export default RecoveryMode
