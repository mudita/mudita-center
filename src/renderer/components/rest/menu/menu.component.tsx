import React from "react"
import Svg from "Renderer/components/core/svg/svg.component"
import MenuGroup from "Renderer/components/rest/menu/menu-group.component"
import { MenuElement, menuElements } from "Renderer/constants/menu-elements"
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
  const checkForDisconnectStatus = (
    elements: MenuElement[],
    disconnectStatus?: DeviceResponse
  ) => {
    if (disconnectStatus?.status === DeviceResponseStatus.Ok) {
      const [news, , desktopMenu] = elements
      return [news, desktopMenu]
    }
    return elements
  }

  const links = checkForDisconnectStatus(menuElements, disconnectedDevice).map(
    ({ label, items, icons }, indexMenu) => {
      return (
        <MenuGroup label={label} items={items} icons={icons} key={indexMenu} />
      )
    }
  )
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
