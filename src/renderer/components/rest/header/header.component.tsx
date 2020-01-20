import * as React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useLocation } from "react-router"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { VIEWS } from "Renderer/constants/views"
import { borderColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  border-bottom: 0.1rem solid ${borderColor("dark")};
`

interface HeaderProps {
  middleComponent?: any
}

const HeaderText = styled(Text)`
  margin: 2.4rem 0 1.5rem 0;
  position: absolute;
  left: 4rem;
`

const Header: FunctionComponent<HeaderProps> = ({ middleComponent }) => {
  const location = useLocation()
  const [currentLocation, setCurrentLocation] = useState()
  useEffect(() => {
    const pathname = location.pathname
    const currentMenuElementName = Object.keys(VIEWS).find(
      key => VIEWS[key as keyof typeof VIEWS].url === pathname
    )
    if (currentMenuElementName) {
      const currentMenuElement =
        VIEWS[currentMenuElementName as keyof typeof VIEWS]
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
      {React.cloneElement(middleComponent, {
        currentLocation: location.pathname,
      })}
    </HeaderWrapper>
  )
}

export default Header
