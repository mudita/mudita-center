/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { APIFC } from "generic-view/utils"
import styled, { css } from "styled-components"
import { BlockPlainConfig } from "generic-view/models"

interface BlockConfig {
  backgroundColor?: NonNullable<BlockPlainConfig>["backgroundColor"]
  $borderTop?: string
  $borderRight?: string
  $borderBottom?: string
  $borderLeft?: string
}

export const BlockPlain: APIFC<undefined, BlockPlainConfig> = ({
  config,
  data,
  ...props
}) => {
  return (
    <Wrapper
      $borderTop={config?.borderTop}
      $borderRight={config?.borderRight}
      $borderBottom={config?.borderBottom}
      $borderLeft={config?.borderLeft}
      {...props}
      backgroundColor={config?.backgroundColor}
    />
  )
}

const Wrapper = styled.div<BlockConfig>`
  position: relative;
  ${({ theme, backgroundColor }) =>
    backgroundColor &&
    (backgroundColor === "white"
      ? css`
          background-color: ${theme.color.white};
        `
      : css`
          background-color: ${theme.color.grey6};
        `)}
  border-top: ${({ $borderTop = undefined }) =>
    $borderTop ? $borderTop : "none"};
  border-right: ${({ $borderRight = undefined }) =>
    $borderRight ? $borderRight : "none"};
  border-bottom: ${({ $borderBottom = undefined }) =>
    $borderBottom ? $borderBottom : "none"};
  border-left: ${({ $borderLeft = undefined }) =>
    $borderLeft ? $borderLeft : "none"};
`
