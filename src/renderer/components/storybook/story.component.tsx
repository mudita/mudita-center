import React, { useContext, useEffect } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css, FlattenInterpolation } from "styled-components"
import {
  StoryContext,
  StorySettingsAction,
} from "Renderer/components/storybook/storybook-wrapper.component"
import {
  Button,
  Heading,
  Wrapper,
} from "Renderer/components/storybook/storybook.elements"
import {
  getSource,
  StoryChildren,
} from "Renderer/components/storybook/storybook.helpers"

const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding-left: 1rem;

  ${Button} {
    width: 2rem;
    height: 2rem;
    margin: 0 0 0.5rem 0.5rem;
  }
`

interface ContainerProps {
  darkMode?: boolean
  borderMode?: boolean
  transparentMode?: boolean
  customStyle?: FlattenInterpolation<any>
}

const transparentModeStyles = css`
  background-color: transparent;
  box-shadow: none;
  padding: 1rem 0;
`

const Container = styled.main<ContainerProps>`
  padding: 2rem;
  box-sizing: border-box;
  background-color: ${({ darkMode }) => (darkMode ? "#999999" : "#ffffff")};
  border-radius: 0.3rem;
  box-shadow: 0 0.2rem 2rem 0 #00000014;
  min-width: 10rem;
  min-height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${({ transparentMode }) => transparentMode && transparentModeStyles};

  ${({ borderMode, darkMode }) =>
    borderMode &&
    css`
      > * {
        box-shadow: 0 0 0 0.1rem ${darkMode ? "#000000" : "#ff0000"} !important;
      }
    `};

  ${({ customStyle }) => customStyle};
`

export interface StoryProps extends ContainerProps {
  title?: string
  noCode?: boolean
}

const Story: FunctionComponent<StoryProps> = ({
  className,
  children,
  title,
  darkMode,
  transparentMode,
  borderMode,
  customStyle,
  noCode,
}) => {
  const { storySettings, setStorySettings, setCompatibleStory } = useContext(
    StoryContext
  )
  const { lineNumber } = getSource(children as StoryChildren)

  const showLine = () =>
    setStorySettings({
      type: StorySettingsAction.CurrentLine,
      payload: lineNumber,
    })

  useEffect(() => {
    setCompatibleStory(true)
  }, [])

  return (
    <Wrapper className={className}>
      <Header>
        <Heading>{title}</Heading>
        <Button
          onClick={showLine}
          enabled={lineNumber === storySettings.currentLine}
          visible={storySettings.sourcePreview && !noCode}
        >
          <svg height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z" />
          </svg>
        </Button>
      </Header>
      <Container
        borderMode={borderMode || storySettings.borderMode}
        darkMode={darkMode}
        transparentMode={transparentMode}
        customStyle={customStyle}
      >
        {children}
      </Container>
    </Wrapper>
  )
}

export default Story
