/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { IconType, TypographyAlign } from "app-theme/models"
import {
  CloseVariant,
  GenericInfoModal,
  ProgressBar,
  Typography,
} from "app-theme/ui"
import { formatMessage } from "app-localize/utils"
import { borderColor, borderRadius } from "app-theme/utils"
import { McHarmonyMscRecoveryModeMessages } from "../harmony-msc-recovery-mode.messages"

interface Props {
  opened: boolean
  progress: number
  progressBarMessage: string
}

export const RecoveryModeProgressModal: FunctionComponent<Props> = ({
  opened,
  progress,
  progressBarMessage,
}) => {
  return (
    <GenericInfoModal
      opened={opened}
      title={formatMessage(
        McHarmonyMscRecoveryModeMessages.recoveryModeProgressModalTitle
      )}
      iconType={IconType.RecoveryMode}
      closeVariant={CloseVariant.None}
    >
      <WarningBox>
        <Typography.H4 textAlign={TypographyAlign.Center}>
          {formatMessage(
            McHarmonyMscRecoveryModeMessages.recoveryModeProgressModalWarningTitle
          )}
        </Typography.H4>
        <Typography.P3 textAlign={TypographyAlign.Center}>
          {formatMessage(
            McHarmonyMscRecoveryModeMessages.recoveryModeProgressModalWarningDescription
          )}
        </Typography.P3>
        <ProgressBar value={progress} message={progressBarMessage} />
      </WarningBox>
    </GenericInfoModal>
  )
}

export const WarningBox = styled.div`
  max-width: 100%;
  border-radius: ${borderRadius("medium")};
  border: 0.2rem solid ${borderColor("deviceListSeparator")};
  border-top: 0.8rem solid ${borderColor("warning")};
  padding: 0 3.2rem 2.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h4 {
    margin: 1.6rem 0;
  }
  p {
    margin-bottom: 2.4rem;
  }
`
