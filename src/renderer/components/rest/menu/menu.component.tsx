import * as React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import Text from "Renderer/components/core/text/text.component"

import { MENU_ELEMENTS } from "Renderer/constants/menuElements"

const MenuWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const LinkWrapper = styled.div`
  margin: 0 10px;
`

const Menu = () => {
  const links = MENU_ELEMENTS.map(({ label, url }) => (
    <LinkWrapper key={url}>
      <Link to={url}>
        <Text message={label} />
      </Link>
    </LinkWrapper>
  ))
  return <MenuWrapper>{links}</MenuWrapper>
}

export default Menu
