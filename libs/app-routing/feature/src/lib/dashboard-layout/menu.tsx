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

interface Props {
  className?: string
}

export const DashboardMenu: FunctionComponent<Props> = ({ className }) => {
  const dispatch = useDispatch()
  const menu = useSelector(selectMenuGroups)

  useLayoutEffect(() => {
    dispatch(
      registerMenuGroups([{ index: 0 }, { index: 2, title: "Mudita Center" }])
    )
  }, [dispatch])

  return (
    <Wrapper className={className}>
      <Logo name={IconType.MuditaLogoFull} />
      {menu.map((menuGroup) => {
        return (
          <MenuGroupWrapper key={menuGroup.index}>
            {menuGroup.title && (
              <MenuGroupTitle>{menuGroup.title}</MenuGroupTitle>
            )}
            {menuGroup.items && menuGroup.items?.length > 0 && (
              <MenuGroupItems>
                {menuGroup.items.map((item) => {
                  return (
                    <MenuItem key={item.path}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        <MenuItemIcon>
                          <Icon name={item.icon} />
                        </MenuItemIcon>
                        <MenuItemLabel>{item.title}</MenuItemLabel>
                      </NavLink>
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
`

const MenuItem = styled.li`
  & > a {
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

    &.active,
    &:hover {
      color: ${({ theme }) => theme.app.color.black};
      background: ${({ theme }) => theme.app.color.grey5};
    }
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
