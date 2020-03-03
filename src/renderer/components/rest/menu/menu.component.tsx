import React from "react"
import Svg from "Renderer/components/core/svg/svg.component"
import MenuGroup from "Renderer/components/rest/menu/menu-group.component"
import { menuElements } from "Renderer/constants/menu-elements"
import MuditaLogo from "Renderer/svg/mudita_logo.svg"
import styled from "styled-components"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"

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

const Menu = () => {
  const links = menuElements.map(({ label, items, icons }, indexMenu) => {
    return (
      <MenuGroup label={label} items={items} icons={icons} key={indexMenu} />
    )
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
