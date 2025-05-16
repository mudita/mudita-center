/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import styled, { css } from "styled-components"
import { defineMessages, formatMessage } from "app-localize/utils"
import { IconSize, IconType, ModalLayer } from "app-theme/models"
import { DevicesDrawerCard, DrawerCardDevice } from "./devices-drawer-card"
import { IconButton } from "app-theme/ui"

const messages = defineMessages({
  title: { id: "general.components.devicesDrawer.title" },
})

interface Device extends DrawerCardDevice {
  id: string
}

interface Props extends PropsWithChildren {
  opened?: boolean
  devices: Device[]
  activeDeviceId?: Device["id"]
  onClose?: VoidFunction
  onSelect?: (id: Device["id"]) => void
}

export const DevicesDrawer: FunctionComponent<Props> = ({
  opened,
  devices,
  activeDeviceId,
  onClose,
  onSelect,
}) => {
  return (
    <>
      <Backdrop onClick={onClose} $visible={opened} />
      <Wrapper $opened={opened}>
        <Header>
          <p>{formatMessage(messages.title)}</p>
          <IconButton
            icon={IconType.Close}
            size={IconSize.Big}
            onClick={onClose}
          />
        </Header>
        <List>
          {devices.map(({ id, ...device }) => {
            const onClick = () => {
              onSelect?.(id)
            }
            return (
              <DevicesDrawerCard
                key={id}
                {...device}
                active={activeDeviceId === id}
                onClick={onClick}
              />
            )
          })}
        </List>
      </Wrapper>
    </>
  )
}

const Backdrop = styled.div<{ $visible?: boolean }>`
  position: fixed;
  z-index: ${ModalLayer.ConnectingLoader};
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
  z-index: ${ModalLayer.ConnectingLoader};
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

  p {
    font-size: ${({ theme }) => theme.app.fontSize.headline4};
    line-height: ${({ theme }) => theme.app.lineHeight.headline4};
    font-weight: ${({ theme }) => theme.app.fontWeight.bold};
    letter-spacing: 0.02em;
    margin: 0;
  }
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
