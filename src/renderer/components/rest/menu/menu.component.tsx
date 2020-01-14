import React from "react"
import styled from "styled-components"

import Button from "Renderer/components/core/button/button.component"
import Svg from "Renderer/components/core/svg/svg.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { MENU_ELEMENTS } from "Renderer/constants/menuElements"

import MuditaLogo from "Renderer/svg/mudita_logo.svg"

const MenuWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0 3.2rem;
`

const Header = styled(Text)`
  margin: 2.5rem 0 1.6rem 0;
`

const LinkWrapper = styled.div`
  margin: 0 1rem;
`

const ButtonMenu = styled(Button)`
  margin: 0 0 0.8rem 0;
`

const SvgMuditaLogo = styled(Svg)`
  height: 2rem;
  width: 8.6rem;
  margin: 2rem 0 3.5rem;
`

const Menu = () => {
  const links = MENU_ELEMENTS.map(({ type, label, buttons }, indexMenu) => {
    switch (type) {
      case "header":
        return (
          <Header
            key={indexMenu}
            displayStyle={TextDisplayStyle.MediumFadedTextUppercased}
            message={label}
          />
        )
      case "buttons":
        return buttons!.map(({ button, icon }, index) => (
          <LinkWrapper key={index}>
            <ButtonMenu
              displayStyle={DisplayStyle.Link4}
              labelMessage={button.label}
              Icon={icon}
              to={button.url}
            />
          </LinkWrapper>
        ))
      default:
        return
    }
  })
  return (
    <MenuWrapper>
      <SvgMuditaLogo Image={MuditaLogo} />
      {links}
    </MenuWrapper>
  )
}

export default Menu
