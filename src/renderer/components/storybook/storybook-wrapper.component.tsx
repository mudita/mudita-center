import React, { createContext, useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"
import SourceCode from "Renderer/components/storybook/source-code.component"
import { Button } from "Renderer/components/storybook/storybook.elements"
import {
  getSource,
  StoryChildren,
} from "Renderer/components/storybook/storybook.helpers"

const Settings = styled.aside`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  margin-left: 1rem;
`

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`

const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
  overflow: auto;
  background-color: #f4f5f6;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

const storySettings = {
  borderMode: false,
  sourcePreview: false,
  currentLine: 0,
  setCurrentLine: (line: number) => {
    // Do nothing
  },
}

export const StoryContext = createContext(storySettings)

const StorybookWrapper: FunctionComponent = ({ className, children }) => {
  const [borderMode, setBorderMode] = useState(false)
  const [sourcePreview, setSourcePreview] = useState(false)
  const [currentLine, setCurrentLine] = useState(0)

  const toggleBorderMode = () => setBorderMode(prevState => !prevState)
  const toggleSourcePreview = () => setSourcePreview(prevState => !prevState)

  const { fileName } = getSource(children as StoryChildren)

  return (
    <StoryContext.Provider
      value={{
        borderMode,
        sourcePreview,
        currentLine,
        setCurrentLine,
      }}
    >
      <Wrapper className={className}>
        <Container>{children}</Container>
        {sourcePreview && fileName && (
          <SourceCode filePath={fileName} currentLine={currentLine} />
        )}
        <Settings>
          <Button enabled={borderMode} onClick={toggleBorderMode}>
            <svg height="24" viewBox="0 0 24 24" width="24">
              <g>
                <rect fill="none" height="24" width="24" />
                <path d="M17,5h-2V3h2V5z M15,15v6l2.29-2.29L19.59,21L21,19.59l-2.29-2.29L21,15H15z M19,9h2V7h-2V9z M19,13h2v-2h-2V13z M11,21h2 v-2h-2V21z M7,5h2V3H7V5z M3,17h2v-2H3V17z M5,21v-2H3C3,20.1,3.9,21,5,21z M19,3v2h2C21,3.9,20.1,3,19,3z M11,5h2V3h-2V5z M3,9h2 V7H3V9z M7,21h2v-2H7V21z M3,13h2v-2H3V13z M3,5h2V3C3.9,3,3,3.9,3,5z" />
              </g>
            </svg>
          </Button>
          <Button enabled={sourcePreview} onClick={toggleSourcePreview}>
            <svg height="24" viewBox="0 0 24 24" width="24">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
            </svg>
          </Button>
        </Settings>
      </Wrapper>
    </StoryContext.Provider>
  )
}

export default StorybookWrapper
