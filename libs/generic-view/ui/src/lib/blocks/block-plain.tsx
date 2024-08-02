/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { APIFC } from "generic-view/utils"
import styled, { css } from "styled-components"
import { BlockPlainConfig } from "generic-view/models"

export const BlockPlain: APIFC<undefined, BlockPlainConfig> = ({
  config,
  data,
  ...props
}) => {
  return <Wrapper {...props} backgroundColor={config?.backgroundColor} />
}

const Wrapper = styled.div<{
  backgroundColor?: NonNullable<BlockPlainConfig>["backgroundColor"]
}>`
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
`
