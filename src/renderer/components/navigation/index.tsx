import * as React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { URL_MAIN } from "Renderer/constants/urls"

const NavigationWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
`

const SLink = styled.div`
  margin: 0 10px;
`

const Navigation = () => {
  const links = Object.keys(URL_MAIN).map(link => (
    <SLink key={link}>
      <Link to={link}>{link}</Link>
    </SLink>
  ))
  return <NavigationWrapper>{links}</NavigationWrapper>
}

export default Navigation
