/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useLayoutEffect } from "react"
import styled from "styled-components"
import { Icon } from "app-theme/ui"
import { useDispatch, useSelector } from "react-redux"
import { registerMenuGroups } from "../store/app-menu.actions"
import { selectMenuGroups } from "../store/app-menu.selectors"
import { NavLink } from "react-router"
import { IconType } from "app-theme/models"
import { defineMessages, formatMessage } from "app-localize/utils"

interface Props {
  className?: string
}

const messages = defineMessages({
  menuTitle: {
    id: "menu.app.title",
  },
})

export const DashboardMenu: FunctionComponent<Props> = ({ className }) => {
  const dispatch = useDispatch()
  const menu = useSelector(selectMenuGroups)

  useLayoutEffect(() => {
    dispatch(
      registerMenuGroups([
        { index: 0 },
        { index: 2, title: formatMessage(messages.menuTitle) },
      ])
    )
  }, [dispatch])

  return (
    <Wrapper className={className}>
      {navigator.userAgent.includes("Mac") && <SystemHeader />}
      <Logo type={IconType.MuditaLogoFull} />
      {menu.map((menuGroup) => {
        return (
          <MenuGroupWrapper key={menuGroup.index}>
            {menuGroup.title && (
              <MenuGroupTitle>{menuGroup.title}</MenuGroupTitle>
            )}
            {menuGroup.items && menuGroup.items?.length > 0 && (
              <MenuGroupItems>
                {menuGroup.items.map((item) => {
                  const submenu = item.items
                  return (
                    <MenuItem key={item.path}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) => {
                          return [
                            isActive && "active",
                            submenu?.length && "parent",
                          ]
                            .filter(Boolean)
                            .join(" ")
                        }}
                      >
                        <MenuItemIcon>
                          <Icon type={item.icon} />
                        </MenuItemIcon>
                        <MenuItemLabel>{item.title}</MenuItemLabel>
                      </NavLink>
                      {submenu?.length && (
                        <MenuGroupItems>
                          {submenu.map((submenu) => {
                            return (
                              <MenuItem key={submenu.path}>
                                <NavLink
                                  to={submenu.path}
                                  className={({ isActive }) =>
                                    isActive ? "active" : ""
                                  }
                                >
                                  <MenuItemLabel>{submenu.title}</MenuItemLabel>
                                </NavLink>
                              </MenuItem>
                            )
                          })}
                        </MenuGroupItems>
                      )}
                    </MenuItem>
                  )
                })}
              </MenuGroupItems>
            )}
          </MenuGroupWrapper>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.app.space.xl};
  align-items: flex-start;

  padding: ${({ theme }) =>
    `${theme.app.space.lg} ${theme.app.space.xxl} ${theme.app.space.xl}`};
  background: ${({ theme }) => theme.app.color.white};
  box-shadow: 0.2rem 0 3rem ${({ theme }) => theme.app.color.blackAlpha.light};
`

const SystemHeader = styled.div`
  -webkit-app-region: drag;
  height: 3.6rem;
  width: calc(100% + 2 * ${({ theme }) => theme.app.space.xxl});
  margin: ${({ theme }) =>
    `-${theme.app.space.lg} -${theme.app.space.xxl} -${theme.app.space.xl}`};
`

const Logo = styled(Icon)`
  width: auto;
  height: 2rem;
`

const MenuGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.app.space.lg};
  width: 100%;
`

const MenuGroupTitle = styled.h2`
  color: ${({ theme }) => theme.app.color.black};
  font-size: ${({ theme }) => theme.app.fontSize.headline6};
  line-height: ${({ theme }) => theme.app.lineHeight.headline6};
  font-weight: ${({ theme }) => theme.app.fontWeight.regular};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
`

const MenuGroupItems = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.app.space.xs};
  list-style: none;
  padding: 0;
  margin: 0;

  & & {
    margin-left: 3.6rem;
    margin-top: ${({ theme }) => theme.app.space.md};
    gap: ${({ theme }) => theme.app.space.md};
    padding-bottom: 0.4rem;
  }
`

const MenuItemIcon = styled.div`
  width: 3.2rem;
  height: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MenuItemLabel = styled.div`
  color: currentColor;
  font-size: ${({ theme }) => theme.app.fontSize.paragraph1};
  line-height: ${({ theme }) => theme.app.lineHeight.paragraph1};
  font-weight: ${({ theme }) => theme.app.fontWeight.regular};
  letter-spacing: 0.02em;
`

const MenuItem = styled.li`
  position: relative;

  & > a {
    height: 4rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.app.space.md};
    padding: ${({ theme }) => theme.app.space.xs};
    color: ${({ theme }) => theme.app.color.grey2};
    border-radius: ${({ theme }) => theme.app.radius.md};
    text-decoration: none;
    transition:
      color 0.2s ease-in-out,
      background 0.2s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.app.color.black};
      background: ${({ theme }) => theme.app.color.grey5};
    }

    &.active {
      color: ${({ theme }) => theme.app.color.black};

      &:not(.parent) {
        background: ${({ theme }) => theme.app.color.grey5};
      }
    }

    &:not(.active) + ${MenuGroupItems} {
      display: none;
    }
  }

  & & {
    &:before,
    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 1.2rem;
      left: -1.6rem;
      background: none;
      border: solid 0.1rem ${({ theme }) => theme.app.color.grey4};
    }
    &:before {
      top: -0.7rem;
      height: 2.8rem;
      border-right: none;
      border-top: none;
    }
    &:after {
      top: 2.1rem;
      height: 2.4rem;
      border-right: none;
      border-bottom: none;
      border-top: none;
    }

    &:last-child {
      &:before {
        border-radius: 0 0 0 ${({ theme }) => theme.app.radius.sm};
      }
      &:after {
        display: none;
      }
    }

    a {
      padding: 0 1rem;
    }
  }
`
