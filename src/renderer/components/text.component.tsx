import { ReactNode } from "react"
import * as React from "react"
import { FormattedMessage } from "react-intl"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"

const TextWrapper = styled.div<{ displayStyle: string }>`
  ${({ displayStyle }) => {
    switch (displayStyle) {
      case "primaryHeading":
        return css`
          font-size: ${56 / 16}rem;
          line-height: ${62 / 56}em;
        `
      case "secondaryBoldHeading":
        return css`
          font-size: ${24 / 16}rem;
          line-height: ${20 / 24}em;
        `
      default:
        return null
    }
  }}
`

interface Props {
  readonly children: ReactNode
  readonly stringId?: string
  readonly asSpan?: boolean
  readonly displayStyle: keyof JSX.IntrinsicElements
}

interface Mapping {
  h1: string
  h2: string
  h3: string
  body: string
  caption: string
  subtitle: string
  sectionElementHeader: string
}

const matchComponentToDisplayStyle = <T extends keyof JSX.IntrinsicElements>(
  displayStyle: T
) => {
  const mapping = {
    primaryHeading: "h1",
    secondaryBoldHeading: "h2",
    h3: "h3",
    body: "p",
    caption: "p",
    subtitle: "p",
    sectionElementHeader: "p",
  }
  return mapping[displayStyle] || "div"
}

const Text: FunctionComponent<Props> = ({
  children,
  stringId,
  asSpan,
  displayStyle,
}) => (
  <TextWrapper
    as={asSpan ? "span" : matchComponentToDisplayStyle(displayStyle)}
    displayStyle={displayStyle}
  >
    {stringId ? <FormattedMessage id={stringId} /> : children}
  </TextWrapper>
)

export default Text
