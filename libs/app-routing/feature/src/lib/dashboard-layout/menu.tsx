/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useLayoutEffect } from "react"
import styled from "styled-components"
import { Button, Icon, Typography } from "app-theme/ui"
import { useDispatch, useSelector } from "react-redux"
import { registerMenuGroups } from "../store/app-menu.actions"
import { selectMenuGroups } from "../store/app-menu.selectors"
import {
  ButtonTextModifier,
  ButtonType,
  IconSize,
  IconType,
} from "app-theme/models"
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
                      <MenuButton
                        to={item.path}
                        type={ButtonType.Text}
                        modifiers={[ButtonTextModifier.DefaultCase]}
                      >
                        <Icon type={item.icon} size={IconSize.Big} />
                        <Typography.P1 as={"span"} color={"currentColor"}>
                          {item.title}
                        </Typography.P1>
                      </MenuButton>
                      {submenu?.length && (
                        <MenuGroupItems>
                          {submenu.map((submenu) => {
                            return (
                              <MenuItem key={submenu.path}>
                                <MenuButton
                                  to={submenu.path}
                                  type={ButtonType.Text}
                                  modifiers={[ButtonTextModifier.DefaultCase]}
                                >
                                  <Typography.P1
                                    as={"span"}
                                    color={"currentColor"}
                                  >
                                    {submenu.title}
                                  </Typography.P1>
                                </MenuButton>
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
  aspect-ratio: initial;
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
  transition-property: opacity, visibility, height, margin-top, padding-bottom;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;

  & & {
    margin-left: 3.6rem;
    margin-top: ${({ theme }) => theme.app.space.md};
    gap: ${({ theme }) => theme.app.space.md};
    padding-bottom: 0.4rem;
  }
`

const MenuItem = styled.li`
  position: relative;

  & & {
    &:before,
    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 1.1rem;
      left: -1.7rem;
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

const MenuButton = styled(Button)`
  justify-content: flex-start;
  height: 4rem;
  padding-left: 0.4rem;
  gap: ${({ theme }) => theme.app.space.sm};
  border-radius: ${({ theme }) => theme.app.radius.md};
  color: ${({ theme }) => theme.app.color.grey2};
  transition:
    color 0.2s ease-in-out,
    background 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.app.color.black};
    background: ${({ theme }) => theme.app.color.grey5};
  }

  &[aria-current] {
    color: ${({ theme }) => theme.app.color.black};

    &:not(:has(+ ${MenuGroupItems})) {
      background: ${({ theme }) => theme.app.color.grey5};
    }
  }

  &:not([aria-current]) + ${MenuGroupItems} {
    height: calc-size(auto, size * 0);
    opacity: 0;
    visibility: hidden;
    margin-top: 0;
    padding-bottom: 0;
  }
`
