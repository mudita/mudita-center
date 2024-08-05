/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import styled from "styled-components"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import Icon, {
  IconSize,
} from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { H4 } from "../texts/headers"

const Wrapper = styled.div`
  display: block;
  width: 41rem;
  border: solid 0.2rem ${({ theme }) => theme.color.grey5};
`

const Top = styled.div`
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.warning};

  svg * {
    fill: #ffffff;
  }
`

const Content = styled.div`
  padding: 0 2.4rem 2.4rem;
`

const Header = styled.div`
  text-align: center;
  padding: 1.4rem;
`

const messages = defineMessages({
  header: {
    id: "component.warningBox.headerTitle",
  },
})

interface WarningBoxProps {
  children: React.ReactNode
}

export const WarrningBox: FunctionComponent<WarningBoxProps> = ({
  children,
}) => {
  return (
    <Wrapper>
      <Top>
        <Icon type={IconType.Exclamation} size={IconSize.ExtraLarge} />
      </Top>
      <Header>
        <H4>{intl.formatMessage(messages.header)}</H4>
      </Header>
      <Content>{children}</Content>
    </Wrapper>
  )
}
