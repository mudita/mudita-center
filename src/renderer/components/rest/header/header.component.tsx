import * as React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useLocation } from "react-router"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { views } from "Renderer/constants/views"
import { borderColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 0.1rem solid ${borderColor("dark")};
`

interface HeaderProps {
  middleComponent?: any
}

const HeaderText = styled(Text)`
  margin: 2.4rem 0 1.5rem 4rem;
`

const Header: FunctionComponent<HeaderProps> = ({ middleComponent }) => {
  const location = useLocation()
  const [currentLocation, setCurrentLocation] = useState()
  useEffect(() => {
    const pathname = location.pathname
    const currentMenuElementName = Object.keys(views).find(
      key => views[key as keyof typeof views].url === pathname
    )
    if (currentMenuElementName) {
      const currentMenuElement =
        views[currentMenuElementName as keyof typeof views]
      setCurrentLocation(currentMenuElement.label)
    }
  }, [location])
  return (
    <HeaderWrapper>
      <HeaderText
        displayStyle={TextDisplayStyle.TertiaryBoldHeading}
        message={currentLocation}
        data-testid={"location"}
      />
      {middleComponent &&
        React.cloneElement(middleComponent, {
          currentLocation: location.pathname,
        })}
      <div />
    </HeaderWrapper>
  )
}

export default Header
