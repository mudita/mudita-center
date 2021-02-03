import React from "react"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import ButtonComponent from "Renderer/components/core/button/button.component"

export const DateRange = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.LargeBoldText,
}))<{ long?: boolean }>`
  margin-bottom: 0.4rem;
  text-align: center;
  min-width: ${({ long }) => (long ? "19rem" : "auto")};
  padding: ${({ long }) => !long && "0 1rem"};
`

export const WeekIndicator = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.SmallFadedText,
}))`
  width: 100%;
  text-align: center;
`

export const Button = styled.button`
  background: none;
  border: 0;
  outline: 0;
  cursor: pointer;
  position: relative;
  top: -0.2rem;
`

export const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  height: 4rem;
  align-items: center;
`

export const GotoButton = styled(ButtonComponent).attrs(() => ({
  displayStyle: DisplayStyle.Link3,
}))`
  width: auto;
  position: relative;
  top: -0.2rem;
`

export const Separator = () => <span> - </span>
