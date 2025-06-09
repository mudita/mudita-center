/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Outlet } from "react-router"
import styled from "styled-components"

export const LegalLayout: FunctionComponent = () => {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 0 2rem;
`
