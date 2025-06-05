/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import styled from "styled-components"
import { defineMessages, formatMessage } from "app-localize/utils"

const messages = defineMessages({
  title: { id: "general.components.deviceSelector.title" },
  subtitle: { id: "general.components.deviceSelector.subtitle" },
})

export const DevicesSelector: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <Wrapper>
      <Header>
        <h1>{formatMessage(messages.title)}</h1>
        <p>{formatMessage(messages.subtitle)}</p>
      </Header>
      <List>{children}</List>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.app.color.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  h1 {
    font-size: ${({ theme }) => theme.app.fontSize.headline2};
    line-height: ${({ theme }) => theme.app.lineHeight.headline2};
    font-weight: ${({ theme }) => theme.app.fontWeight.regular};
    margin: 0;
  }

  p {
    font-size: ${({ theme }) => theme.app.fontSize.paragraph1};
    line-height: ${({ theme }) => theme.app.lineHeight.paragraph1};
    color: ${({ theme }) => theme.app.color.grey2};
    letter-spacing: 0.02em;
    margin: 0;
  }
`

const List = styled.ul`
  width: 100%;
  list-style: none;
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 1.6rem 2.6rem 1.2rem;

  display: grid;
  grid-template-columns: repeat(auto-fill, 34rem);
  grid-auto-rows: 44rem;
  justify-content: center;
  column-gap: 2.6rem;
  row-gap: 3rem;
`
