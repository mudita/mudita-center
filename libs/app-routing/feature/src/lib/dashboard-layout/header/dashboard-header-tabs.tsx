/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import { FunctionComponent, useCallback, useRef } from "react"
import { NavLink, useLocation } from "react-router"
import { DashboardHeaderPortal } from "./header"
import { IconType } from "app-theme/models"
import { Icon } from "app-theme/ui"

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
      >
        {tabs.map((tab) => (
          <NavLink
            to={tab.path}
            key={tab.path}
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={setLineActive}
          >
            <TabWrapper>
              <TabIcon type={tab.icon} />
              <TabTitle>{tab.title}</TabTitle>
            </TabWrapper>
          </NavLink>
        ))}
        <Line ref={lineRef} />
      </TabsContainer>
    </DashboardHeaderPortal>
  )
}

const TabIcon = styled(Icon)`
  transition: color 0.2s ease-in-out;
`

const TabTitle = styled.h2`
  font-size: ${({ theme }) => theme.app.fontSize.headline4};
  line-height: ${({ theme }) => theme.app.lineHeight.headline4};
  font-weight: ${({ theme }) => theme.app.fontWeight.regular};
  letter-spacing: 0.02em;
  margin: 0;
  transition: color 0.2s ease-in-out;
`

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

    &.active {
      ${TabIcon}, ${TabTitle} {
        color: ${({ theme }) => theme.app.color.black};
      }
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
