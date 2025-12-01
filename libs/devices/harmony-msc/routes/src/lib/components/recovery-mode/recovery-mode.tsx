/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { IconType } from "app-theme/models"
import { Icon, Typography } from "app-theme/ui"
import { formatMessage } from "app-localize/utils"
import { McHarmonyMscRecoveryModeMessages } from "../../harmony-msc-recovery-mode.messages"
import { RecoveryModeWarning } from "./recovery-mode-warning"

interface RecoveryModeProps {
  onConfirm: VoidFunction
}

export const RecoveryMode: FunctionComponent<RecoveryModeProps> = ({
  onConfirm,
}) => {
  return (
    <Wrapper>
      <Header>
        <Icon type={IconType.RecoveryMode} size={4.8} />
        <Typography.H3>
          {formatMessage(
            McHarmonyMscRecoveryModeMessages.recoveryModeHeaderTitle
          )}
        </Typography.H3>
        <Typography.P3>
          {formatMessage(
            McHarmonyMscRecoveryModeMessages.recoveryModeHeaderDescription
          )}
        </Typography.P3>
      </Header>
      <RecoveryModeWarning onConfirm={onConfirm} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
  padding-top: 3rem;
  background: ${({ theme }) => theme.app.color.white};
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    margin: 1.2rem 0 1.2rem 0;
  }

  p {
    text-align: center;
  }
`
