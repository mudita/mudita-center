import * as React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useLocation } from "react-router"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { borderColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const HeaderWrapper = styled.div`
  border-bottom: 0.1rem solid ${borderColor("dark")};
`

const HeaderViewText = styled(Text)`
  text-transform: capitalize;
`

const Header: FunctionComponent = () => {
  const location = useLocation()
  const [currentLocation, setCurrentLocation] = useState("")
  useEffect(() => {
    setCurrentLocation(location.pathname.split("/")[1])
  }, [location])
  return (
    <HeaderWrapper>
      <HeaderViewText displayStyle={TextDisplayStyle.TertiaryBoldHeading}>
        {currentLocation}
      </HeaderViewText>
    </HeaderWrapper>
  )
}

export default Header
