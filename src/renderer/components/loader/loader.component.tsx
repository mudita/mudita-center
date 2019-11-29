import * as React from "react"
import { textColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"

const chaseAnimation = css`
  @keyframes chase {
    100% {
      transform: rotate(360deg);
    }
  }
  animation: chase 2.5s infinite linear both;
`

const dotAnimation = css`
  @keyframes chase-dot {
    80%,
    100% {
      transform: rotate(360deg);
    }
  }
  animation: chase-dot 2s infinite ease-in-out both;
`

const dotBeforeAnimation = css`
  @keyframes dot-before {
    50% {
      transform: scale(0.4);
    }
    100%,
    0% {
      transform: scale(1);
    }
  }
  animation: dot-before 2s infinite ease-in-out both;
`

const LoaderWrapper = styled.div<{ size: Size }>`
  width: ${({ size }) => size.width}px;
  height: ${({ size }) => size.height}px;
  position: relative;
  ${chaseAnimation};
  color: ${textColor("supplementary")};
`

const LoaderDot = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  ${dotAnimation}
  &:before {
    content: "";
    display: block;
    width: 25%;
    height: 25%;
    background-color: currentColor;
    border-radius: 100%;
    ${dotBeforeAnimation}
  }
  &:nth-child(1) {
    &,
    &:before {
      animation-delay: -1.1s;
    }
  }
  &:nth-child(2) {
    &,
    &:before {
      animation-delay: -1s;
    }
  }
  &:nth-child(3) {
    &,
    &:before {
      animation-delay: -0.9s;
    }
  }
  &:nth-child(4) {
    &,
    &:before {
      animation-delay: -0.8s;
    }
  }
  &:nth-child(5) {
    &,
    &:before {
      animation-delay: -0.7s;
    }
  }
  &:nth-child(6) {
    &,
    &:before {
      animation-delay: -0.6s;
    }
  }
`

interface Size {
  height: number
  width: number
}

interface Props {
  size: Size
}

const Loader: FunctionComponent<Props> = ({ size, className }) => {
  const defaultNumberOfDots = 6
  const arrayOfDots = Array(defaultNumberOfDots)
    .fill(0)
    .map((_, index) => <LoaderDot data-testid="dot" key={index} />)
  return (
    <LoaderWrapper size={size} className={className}>
      {arrayOfDots}
    </LoaderWrapper>
  )
}

export default Loader
