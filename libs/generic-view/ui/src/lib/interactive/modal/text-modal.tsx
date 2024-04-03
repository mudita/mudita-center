/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { UIEventHandler, useState } from "react"
import { BaseGenericComponent, ModalAction } from "generic-view/utils"
import styled, { css } from "styled-components"
import { useModalsQueue } from "./use-modals-queue"
import { withData } from "../../utils/with-data"
import { withConfig } from "../../utils/with-config"
import { ModalBase } from "./modal-base"
import { ModalCloseButton } from "./modal-helpers"

interface Config {
  closeButtonAction?: ModalAction
  width?: string | number
}

export const TextModal: BaseGenericComponent<
  undefined,
  Config,
  { componentKey: string }
> = ({ children, componentKey, config }) => {
  const { opened } = useModalsQueue(componentKey)
  const [contentScrolled, setContentScrolled] = useState(false)

  const handleScroll: UIEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLDivElement
    setContentScrolled(target.scrollTop > 0)
  }

  const closeAction: ModalAction = config?.closeButtonAction
    ? config.closeButtonAction
    : { type: "close-modal", modalKey: componentKey }

  return (
    <ModalBase
      opened={opened}
      config={{
        width: config?.width || 680,
      }}
    >
      <Header $active={contentScrolled}>
        <ModalCloseButton action={closeAction} test-id={"close-button"} />
      </Header>
      <ScrollContainer onScroll={handleScroll}>{children}</ScrollContainer>
    </ModalBase>
  )
}

export default withConfig(withData(TextModal))

const headerWhileScrollingStyles = css`
  box-shadow: 0 1rem 5rem 0 rgba(0, 0, 0, 0.08);
`

const Header = styled.header<{ $active: boolean }>`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  min-height: 8rem;
  padding: ${({ theme }) => theme.space.xl};
  transition: box-shadow 0.3s ease-in-out;
  background-color: ${({ theme }) => theme.color.white};
  ${({ $active }) => $active && headerWhileScrollingStyles};

  button {
    position: relative;
    top: 0;
    right: 0;
  }
`

const ScrollContainer = styled.div`
  overflow-y: auto;
  padding: 0 3.7rem 0 4rem;
  margin-right: 0.3rem;
  margin-bottom: 4rem;
  flex: 1;
  width: var(--modal-width);
`
