/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import * as React from "react"
import { textColor } from "Renderer/styles/theming/theme-getters"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import { LoaderSpinnerProps } from "Renderer/components/core/loader/loader.interface"

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

const LoaderWrapper = styled.span<{ size?: number }>`
  display: block;
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;
  position: relative;
  ${chaseAnimation};
  color: ${textColor("action")};
`

const LoaderDot = styled.span`
  display: block;
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

const LoaderSpinner: FunctionComponent<LoaderSpinnerProps> = ({
  size = 4,
  className,
}) => {
  const arrayOfDots = Array(6)
    .fill(0)
    .map((_, index) => <LoaderDot data-testid="dot" key={index} />)
  return (
    <LoaderWrapper
      data-testid="loader-spinner"
      size={size}
      className={className}
    >
      {arrayOfDots}
    </LoaderWrapper>
  )
}

export default LoaderSpinner
