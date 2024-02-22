/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC, IconType } from "generic-view/utils"
import { withConfig } from "../../utils/with-config"
import { RoundIconWrapper } from "../../shared/shared"
import Icon from "../../icon/icon"

interface Config {
  features: string[]
}

export const BackupCreate: APIFC<undefined, Config> = ({
  data,
  config,
  children,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <Header>
        <RoundIconWrapper>
          <Icon
            data={{
              type: IconType.Backup,
            }}
          />
        </RoundIconWrapper>
        <Headline>Create backup</Headline>
      </Header>
      <Main>
        <p>All backup data stays on your computer.</p>
        <ul>
          <li>Contact list</li>
          <li>Call log</li>
          <li>Messages</li>
          <li>Notes</li>
          <li>Calendar events</li>
          <li>OS version & OS Settings</li>
          <li>App settings: Phone, Messages</li>
        </ul>
      </Main>
      <Buttons>{children}</Buttons>
    </Wrapper>
  )
}

export default withConfig(BackupCreate)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 3.6rem 3.6rem;
  gap: 4rem;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.4rem;
`

const Headline = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.headline3};
  line-height: ${({ theme }) => theme.lineHeight.headline3};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin: 0;
`

const Main = styled.article`
  width: 100%;

  p {
    color: ${({ theme }) => theme.color.grey1};
    font-size: ${({ theme }) => theme.fontSize.paragraph1};
    line-height: ${({ theme }) => theme.lineHeight.paragraph1};
    letter-spacing: 0.02em;
    text-align: center;
    margin: 0 0 2.4rem;
  }

  ul {
    margin: 0;
    padding-left: 3.1rem;

    li {
      font-size: ${({ theme }) => theme.fontSize.paragraph3};
      line-height: 3.2rem;
      letter-spacing: 0.05em;
      padding-left: 1.6rem;
      color: ${({ theme }) => theme.color.grey1};
    }
  }
`

const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 2.4rem;

  & > * {
    flex: 1;
  }
`
