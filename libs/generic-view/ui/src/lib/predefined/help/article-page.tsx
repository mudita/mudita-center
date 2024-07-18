/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { GenericThemeProvider } from "generic-view/theme"
import styled from "styled-components"

const Article: FunctionComponent = () => {
  return <Wrapper>

  </Wrapper>
}

export const ArticlePage: FunctionComponent = () => {
  return (
    <GenericThemeProvider>
      <Article />
    </GenericThemeProvider>
  )
}

const Wrapper = styled.div``
