/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import { FunctionComponent, useCallback, useRef } from "react"
import { useLocation } from "react-router"
import { DashboardHeaderPortal } from "./header"
import {
  ButtonTextModifier,
  ButtonType,
  IconSize,
  IconType,
} from "app-theme/models"
import { Button, Icon, Typography } from "app-theme/ui"

export type Tab = {
  title: string
  icon: IconType
  path: string
}

interface Props {
  tabs: Tab[]
}

export const DashboardHeaderTabs: FunctionComponent<Props> = ({ tabs }) => {
  const location = useLocation()
  const tabsRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  const currentTabIndex = tabs.findIndex((tab) => {
    return tab.path === location.pathname
  })

  const moveLine = useCallback(() => {
    const tabsElement = tabsRef.current
    const lineElement = lineRef.current

    if (!tabsElement || !lineElement || currentTabIndex === -1) return

    const activeTab = tabsElement.children.item(currentTabIndex) as HTMLElement
    if (!activeTab) return

    const { offsetLeft, offsetWidth } = activeTab
    lineElement.style.width = `${offsetWidth}px`
    lineElement.style.transform = `translateX(${offsetLeft}px)`
  }, [currentTabIndex])

  const setLineActive = useCallback(() => {
    const lineElement = lineRef.current
    if (!lineElement || lineElement.classList.contains("active")) return

    lineElement.classList.add("active")
  }, [lineRef])

  return (
    <DashboardHeaderPortal placement={"center"}>
      <TabsContainer
        ref={(node) => {
          tabsRef.current = node
          moveLine()
        }}
        data-testid="dashboard-header-tabs"
      >
        {tabs.map((tab) => (
          <Button
            type={ButtonType.Text}
            to={tab.path}
            key={tab.path}
            onClick={setLineActive}
            modifiers={[ButtonTextModifier.DefaultCase]}
          >
            <TabWrapper>
              <Icon type={tab.icon} size={IconSize.Medium} />
              <Typography.P1 color={"currentColor"}>{tab.title}</Typography.P1>
            </TabWrapper>
          </Button>
        ))}
        <Line ref={lineRef} />
      </TabsContainer>
    </DashboardHeaderPortal>
  )
}

const TabsContainer = styled.nav`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4rem;
  height: 100%;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.app.color.grey2};

    &[aria-current] {
      color: ${({ theme }) => theme.app.color.black};
    }
  }
`

const TabWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.app.space.md};
  padding: 0 0.1rem;
`

const Line = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  transform: translateX(0);
  height: 0.2rem;
  background: ${({ theme }) => theme.app.color.black};

  &.active {
    transition:
      transform 0.2s ease-in-out,
      width 0.2s ease-in-out;
  }
`
