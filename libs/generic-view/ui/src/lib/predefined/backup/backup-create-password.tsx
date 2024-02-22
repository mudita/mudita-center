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

export const BackupCreatePassword: APIFC<undefined, Config> = ({
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
              type: IconType.Settings,
            }}
          />
        </RoundIconWrapper>
        <Headline>
          Create password for backup
          <span>(optional)</span>
        </Headline>
      </Header>
      <Main>
        <p>
          You can protect backup with a new password.
          <span>* You can&apos;t change/recover the password later.</span>
        </p>
      </Main>
      <Buttons>{children}</Buttons>
    </Wrapper>
  )
}

export default withConfig(BackupCreatePassword)

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

  span {
    margin: -0.1rem 0 0;
    display: block;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.paragraph1};
    line-height: ${({ theme }) => theme.lineHeight.paragraph1};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    letter-spacing: 0.02em;
  }
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

    span {
      display: block;
      margin: 0;
      color: ${({ theme }) => theme.color.grey2};
      font-weight: ${({ theme }) => theme.fontWeight.light};
    }
  }
`

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2.4rem;

  & > * {
    flex: 1;
  }
`
