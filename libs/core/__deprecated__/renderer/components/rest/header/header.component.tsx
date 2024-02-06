/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { MouseEventHandler, ReactElement, useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router"
import styled from "styled-components"
import { useSelector } from "react-redux"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { views } from "Core/__deprecated__/renderer/constants/views"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import {
  backgroundColor,
  borderColor,
} from "Core/core/styles/theming/theme-getters"
import { Link } from "react-router-dom"
import { defineMessages } from "react-intl"
import Icon, {
  IconSize,
} from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { selectActiveDeviceMenuElements } from "generic-view/store"

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

  const genericMenu = useSelector(
    // (state: ReduxRootState) => state.genericViews.menu
    selectActiveDeviceMenuElements
  )
  const [currentLocation, setCurrentLocation] = useState<
    { id: string } | string
  >()
  const [renderHeaderButton, setRenderHeaderButton] = useState(false)
  useEffect(() => {
    const pathname = location.pathname
    const currentMenuElementName = Object.keys(views).find(
      (key) => views[key as keyof typeof views].url === pathname
    )
    const menuElementNameWithHeaderButton = Object.keys(views).find(
      (key) => views[key as keyof typeof views].renderHeaderButton
    )
    if (currentMenuElementName) {
      const currentMenuElement =
        views[currentMenuElementName as keyof typeof views]
      setCurrentLocation(currentMenuElement.label)
      setRenderHeaderButton(
        menuElementNameWithHeaderButton === currentMenuElementName
      )
    } else if (!previousViewName) {
      const currentGenericMenuElement = genericMenu
        ?.flatMap((element) => element.items)
        .find((item) => item?.button.url === pathname)
      if (currentGenericMenuElement) {
        setCurrentLocation(currentGenericMenuElement.button.label)
        setRenderHeaderButton(false)
      }
    }
  }, [genericMenu, location, previousViewName])
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

export default Header
