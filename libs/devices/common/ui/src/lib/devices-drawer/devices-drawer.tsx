/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import styled from "styled-components"
import { defineMessages } from "app-localize/utils"
import { IconSize, IconType, ModalLayer } from "app-theme/models"
import { IconButton, Typography } from "app-theme/ui"
import { AnimatePresence, motion } from "motion/react"

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
    <AnimatePresence initial={false} mode={"sync"}>
      {opened && (
        <>
          <Backdrop
            key={"backdrop"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <Wrapper
            key={"drawer"}
            initial={{ transform: "translateX(calc(100% + 3.2rem))" }}
            animate={{ transform: "translateX(0)" }}
            exit={{ transform: "translateX(calc(100% + 3.2rem))" }}
          >
            <Header>
              <Typography.H4 as={"p"} message={messages.title.id} />
              <IconButton
                icon={IconType.Close}
                size={IconSize.Big}
                onClick={onClose}
                aria-label="Close drawer"
              />
            </Header>
            <List>{children}</List>
          </Wrapper>
        </>
      )}
    </AnimatePresence>
  )
}

const Backdrop = styled(motion.div)`
  position: fixed;
  z-index: ${ModalLayer.ConnectingLoader};
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.app.color.black};
`

const Wrapper = styled(motion.div)`
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
