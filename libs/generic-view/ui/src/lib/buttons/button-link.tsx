/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { ButtonText } from "./button-text"
import { withConfig } from "../utils/with-config"

export const ButtonLink: typeof ButtonText = (props) => {
  return <Button {...props} />
}

export default withConfig(ButtonLink)

const Button = styled(ButtonText)`
  span {
    font-size: ${({ theme }) => theme.fontSize.buttonLink};
    line-height: ${({ theme }) => theme.lineHeight.buttonLink};
    letter-spacing: 0.05em;
    text-transform: unset;
  }
  &:hover span {
    text-decoration: underline;
  }
`
