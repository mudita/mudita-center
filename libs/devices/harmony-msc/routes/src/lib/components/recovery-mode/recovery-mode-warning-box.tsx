/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import styled from "styled-components"
import { IconType } from "app-theme/models"
import { Icon, Typography } from "app-theme/ui"
import { formatMessage } from "app-localize/utils"
import { McHarmonyMscRecoveryModeMessages } from "../../harmony-msc-recovery-mode.messages"

export const RecoveryModeWarningBox: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <Wrapper>
      <Top>
        <Icon type={IconType.Error} size={4.8} />
      </Top>
      <Header>
        <Typography.H4>
          {formatMessage(
            McHarmonyMscRecoveryModeMessages.recoveryModeWarningTitle
          )}
        </Typography.H4>
      </Header>
      <Content>{children}</Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: block;
  width: 41rem;
  border: solid 0.2rem ${({ theme }) => theme.app.color.grey5};
  border-radius: 0.4rem;
`

const Top = styled.div`
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.app.color.orange};
  color: ${({ theme }) => theme.app.color.white};
`

const Content = styled.div`
  padding: 0 2.4rem 2.4rem;
`

const Header = styled.div`
  text-align: center;
  padding: 1.4rem;
`
