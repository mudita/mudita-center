import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

export const DateRange = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.LargeBoldText,
}))`
  margin-bottom: 0.4rem;
  text-align: center;
  min-width: 19rem;
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
`

export const GotoButton = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.SmallSupplementaryText,
  element: "button",
}))`
  line-height: 1.7rem;
  cursor: pointer;
  background: none;
  border: 0;
  padding: 0;
  align-self: flex-start;
  margin-right: 1.65rem;

  &:focus,
  &:active {
    outline: 0;
  }
`
