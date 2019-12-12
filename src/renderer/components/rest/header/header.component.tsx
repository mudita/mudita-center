import * as React from "react"
import { ReactNode, useState } from "react"
import { useEffect } from "react"
import { useLocation } from "react-router"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { MENU_ELEMENTS } from "Renderer/constants/menuElements"
import { borderColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 0.1rem solid ${borderColor("dark")};
`

interface HeaderProps {
  middleComponent?: ReactNode
}

const HeaderText = styled(Text)`
  margin: 0;
`

const Header: FunctionComponent<HeaderProps> = ({ middleComponent }) => {
  const location = useLocation()
  const [currentLocation, setCurrentLocation] = useState()
  useEffect(() => {
    const pathname = location.pathname
    const label = MENU_ELEMENTS.filter(({ url }) => url === pathname)[0].label
    setCurrentLocation(label)
  }, [location])
  return (
    <HeaderWrapper>
      <HeaderText
        displayStyle={TextDisplayStyle.TertiaryBoldHeading}
        message={currentLocation}
        data-testid={"location"}
      />
      {middleComponent}
    </HeaderWrapper>
  )
}

export default Header
