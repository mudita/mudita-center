import { ReactNode } from "react"
import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const TextWrapper = styled.div``

interface Props {
  children: ReactNode
}

const Text: FunctionComponent<Props> = () => <TextWrapper>text</TextWrapper>

export default Text
