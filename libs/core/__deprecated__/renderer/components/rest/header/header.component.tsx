/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { MouseEventHandler, ReactElement, useState, useEffect } from "react"
import { useHistory, useLocation } from "react-router"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { defineMessages } from "react-intl"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { views } from "Core/__deprecated__/renderer/constants/views"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import {
  backgroundColor,
  borderColor,
} from "Core/core/styles/theming/theme-getters"
import Icon, {
  IconSize,
} from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { selectActiveDeviceMenuElements } from "generic-view/store"
import {
  MenuElement,
  MenuElementItem,
} from "Core/__deprecated__/renderer/constants/menu-elements"

const messages = defineMessages({
  backButtonLabel: { id: "module.generic.viewBackButton" },
})

const HeaderWrapper = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: ${backgroundColor("row")};
  border-bottom: 0.1rem solid ${borderColor("separator")};
`

interface HeaderProps {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  middleComponent?: any
  button?: ReactElement
}

const HeaderText = styled(Text)`
  align-self: center;
  margin-left: 3.2rem;
`

const BackButton = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 3.2rem;

  ${HeaderText} {
    margin-left: 0.2rem;
    line-height: 1.7;
  }
`

const Header: FunctionComponent<HeaderProps> = ({
  middleComponent,
  button,
}) => {
  const location = useLocation<{ previousViewName?: string }>()
  const history = useHistory()
  const goBack: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault()
    history.goBack()
  }
  const previousViewName = location?.state?.previousViewName

  const genericMenu = useSelector(selectActiveDeviceMenuElements)
  const [currentLocation, setCurrentLocation] = useState<
    { id: string } | string
  >()
  const [renderHeaderButton, setRenderHeaderButton] = useState(false)
  useEffect(() => {
    const pathname = location.pathname
    const label = resolveHeaderLabel(pathname, genericMenu ?? [])
    if (label !== undefined) {
      setCurrentLocation(label)
    }
    const renderButton =
      Object.keys(views).find(
        (key) =>
          views[key as keyof typeof views].url === pathname &&
          views[key as keyof typeof views].renderHeaderButton
      ) !== undefined
    setRenderHeaderButton(renderButton)
  }, [genericMenu, location, previousViewName])

  console.log(currentLocation, location, previousViewName)
  return (
    <HeaderWrapper>
      {previousViewName ? (
        <BackButton onClick={goBack} to={""}>
          <Icon type={IconType.ArrowLongLeft} size={IconSize.Medium} />
          <HeaderText
            displayStyle={TextDisplayStyle.Button}
            message={intl.formatMessage(messages.backButtonLabel, {
              name: previousViewName,
            })}
            data-testid={"location"}
          />
        </BackButton>
      ) : (
        <HeaderText
          id={"app-header"}
          displayStyle={TextDisplayStyle.Headline4}
          message={currentLocation}
          data-testid={"location"}
        />
      )}
      {middleComponent &&
        React.cloneElement(middleComponent, {
          currentLocation: location.pathname,
        })}
      {renderHeaderButton && button}
    </HeaderWrapper>
  )
}

const findLabelInMenuItems = (
  items: MenuElementItem[],
  pathname: string
): string | undefined => {
  for (const item of items) {
    if (item?.items && item.button.inheritHeaderName) {
      const found = findLabelInMenuItems(item.items, pathname)
      if (found) return found
    }
    if (item?.button?.url === pathname) {
      const label = item.button.label
      return typeof label === "string" ? label : label?.id
    }
  }
  return undefined
}

const resolveHeaderLabel = (
  pathname: string,
  genericMenu: MenuElement[]
): string | undefined => {
  const viewKey = Object.keys(views).find(
    (key) => views[key as keyof typeof views].url === pathname
  )

  if (viewKey) {
    const label = views[viewKey as keyof typeof views].label
    if (typeof label === "string") return label
    if (label?.id) return intl.formatMessage({ id: label.id })
    return undefined
  }

  const allItems = genericMenu.flatMap((element) =>
    Array.isArray(element.items) ? element.items : []
  )
  return allItems.length ? findLabelInMenuItems(allItems, pathname) : undefined
}

export default Header
