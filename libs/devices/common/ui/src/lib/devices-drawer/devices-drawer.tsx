/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import styled, { css } from "styled-components"
import { defineMessages } from "app-localize/utils"
import { IconSize, IconType } from "app-theme/models"
import { IconButton, Typography } from "app-theme/ui"

const messages = defineMessages({
  title: { id: "general.components.devicesDrawer.title" },
})

interface Props extends PropsWithChildren {
  opened?: boolean
  onClose?: VoidFunction
}

export const DevicesDrawer: FunctionComponent<Props> = ({
  opened,
  onClose,
  children,
}) => {
  return (
    <>
      <Backdrop onClick={onClose} $visible={opened} />
      <Wrapper $opened={opened}>
        <Header>
          <Typography.H4 as={"p"} message={messages.title.id} />
          <IconButton
            icon={IconType.Close}
            size={IconSize.Big}
            onClick={onClose}
          />
        </Header>
        <List>{children}</List>
      </Wrapper>
    </>
  )
}

const Backdrop = styled.div<{ $visible?: boolean }>`
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  visibility: hidden;
  background-color: ${({ theme }) => theme.app.color.black};
  opacity: 0;
  transition-property: visibility, opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 0.3;
      visibility: visible;
    `}
`

const Wrapper = styled.div<{ $opened?: boolean }>`
  position: absolute;
  z-index: 9999;
  right: 0;
  top: 0;
  height: 100%;
  width: 37rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${({ theme }) => theme.app.color.white};
  box-shadow: 0.2rem 0 3rem ${({ theme }) => theme.app.color.blackAlpha.light};
  transform: translateX(calc(100% + 3.2rem));
  transition: transform 0.3s ease-in-out;

  ${({ $opened }) =>
    $opened &&
    css`
      transform: translateX(0);
    `}
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 1.6rem 0;
`

const List = styled.ul`
  list-style: none;
  padding: 3.2rem 1.6rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 3.8rem;
  overflow-y: auto;
`
