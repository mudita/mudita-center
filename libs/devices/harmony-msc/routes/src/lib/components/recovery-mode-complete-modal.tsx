/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { IconType } from "app-theme/models"
import { CloseVariant, GenericInfoModal, Icon } from "app-theme/ui"
import { formatMessage } from "app-localize/utils"
import { McHarmonyMscRecoveryModeMessages } from "../harmony-msc-recovery-mode.messages"

interface Props {
  opened: boolean
  onClose: VoidFunction
}

export const RecoveryModeCompleteModal: FunctionComponent<Props> = ({
  opened,
  onClose,
}) => {
  return (
    <GenericInfoModal
      opened={opened}
      closeVariant={CloseVariant.Icon}
      iconType={IconType.CheckCircle}
      title={formatMessage(
        McHarmonyMscRecoveryModeMessages.recoveryModeCompleteModalTitle
      )}
      description={formatMessage(
        McHarmonyMscRecoveryModeMessages.recoveryModeCompleteModalDescription
      )}
      onClose={onClose}
    >
      <Icon type={IconType.LightButtonIcon} size={4.8} />
    </GenericInfoModal>
  )
}
