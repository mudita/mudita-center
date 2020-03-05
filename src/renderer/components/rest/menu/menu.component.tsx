import React from "react"
import Svg from "Renderer/components/core/svg/svg.component"
import MenuGroup from "Renderer/components/rest/menu/menu-group.component"
import { menuElements } from "Renderer/constants/menu-elements"
import MuditaLogo from "Renderer/svg/mudita_logo.svg"
import styled from "styled-components"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"

const MenuWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0 3.2rem;
`

const LogoWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ${backgroundColor("light")};
`

const SvgMuditaLogo = styled(Svg)`
  height: 2rem;
  width: 8.6rem;
  margin: 2rem 0 3.5rem;
`

interface Props {
  disconnectedDevice?: DeviceResponse
}

const Menu: FunctionComponent<Props> = ({ disconnectedDevice }) => {
  const links = menuElements
    .filter(({ hideOnDisconnect }) =>
      disconnectedDevice?.status === DeviceResponseStatus.Ok
        ? !hideOnDisconnect
        : true
    )
    .map(({ hideOnDisconnect, ...props }, indexMenu) => {
      return <MenuGroup {...props} key={indexMenu} />
    })
  return (
    <MenuWrapper>
      <LogoWrapper>
        <SvgMuditaLogo Image={MuditaLogo} />
      </LogoWrapper>
      {links}
    </MenuWrapper>
  )
}

export default Menu
