/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { IconType, TypographyAlign } from "app-theme/models"
import { CloseVariant, GenericInfoModal, Typography } from "app-theme/ui"
import { formatMessage } from "app-localize/utils"
import { McHarmonyMscRecoveryModeMessages } from "../../../harmony-msc-recovery-mode.messages"
import { recoveryModeTerminalSetupStepList } from "./recovery-mode-terminal-setup-step-list"

interface Props {
  opened: boolean
  onClose: VoidFunction
}

export const RecoveryModeTerminalSetupModal: FunctionComponent<Props> = ({
  opened,
  onClose,
}) => {
  return (
    <GenericInfoModal
      opened={opened}
      title={formatMessage(
        McHarmonyMscRecoveryModeMessages.recoveryModeTerminalSetupModalTitle
      )}
      iconType={IconType.CheckCircle}
      closeVariant={CloseVariant.Icon}
      onClose={onClose}
    >
      <StepsInfo>
        <Typography.H4 textAlign={TypographyAlign.Center}>
          {formatMessage(
            McHarmonyMscRecoveryModeMessages.recoveryModeTerminalSetupModalSubtitle
          )}
        </Typography.H4>
        <>
          {recoveryModeTerminalSetupStepList.map((stepMessage, index) => (
            <Typography.P3 key={index} textAlign={TypographyAlign.Left}>
              {index + 1}. {formatMessage(stepMessage)}
            </Typography.P3>
          ))}
        </>
      </StepsInfo>
    </GenericInfoModal>
  )
}

const StepsInfo = styled.div`
  margin-top: -1.6rem;

  h4 {
    margin-bottom: 1.6rem;
  }

  p {
    margin-top: 0.8rem;
  }
`
