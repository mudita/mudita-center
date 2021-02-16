/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React, { createContext, ReactElement } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled, { FlattenInterpolation } from "styled-components"
import { Heading, Wrapper } from "./storybook.elements"

const ContainerHeading = styled(Heading)`
  font-weight: 600;
  font-size: 1.5rem;
  margin: 0 1rem 1rem 1rem;
`

const Container = styled.div<{
  column?: boolean
  customStyle?: FlattenInterpolation<any>
}>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  align-items: ${({ column }) => (column ? "flex-start" : "flex-end")};
  padding: 0 1rem;
  box-sizing: border-box;

  ${({ customStyle }) => customStyle};
`

export interface StoryContainerProps {
  title?: string
  column?: boolean
  darkMode?: boolean
  customStyle?: FlattenInterpolation<any>
}

export const DarkModeContext = createContext({ darkMode: false })

const StoryContainer: FunctionComponent<StoryContainerProps> = ({
  className,
  children,
  title,
  column,
  darkMode,
  customStyle,
}) => (
  <DarkModeContext.Provider value={{ darkMode: Boolean(darkMode) }}>
    <Wrapper className={className}>
      {title && <ContainerHeading>{title}</ContainerHeading>}
      <Container
        column={column}
        customStyle={customStyle}
        data-testid="container"
      >
        {children &&
          React.Children.map(children, (child, index) =>
            React.cloneElement(child as ReactElement, {
              key: index,
              ...(darkMode !== undefined && { darkMode }),
            })
          )}
      </Container>
    </Wrapper>
  </DarkModeContext.Provider>
)

export default StoryContainer
