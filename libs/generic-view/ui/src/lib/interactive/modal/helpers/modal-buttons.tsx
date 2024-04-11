/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled, { css } from "styled-components"
import { APIFC } from "generic-view/utils"
import { withConfig } from "../../../utils/with-config"

export const ModalButtons: APIFC<undefined, { vertical?: boolean }> = ({
  data,
  children,
  config,
  ...rest
}) => {
  return (
    <ButtonsWrapper $vertical={config?.vertical} {...rest}>
      {children}
    </ButtonsWrapper>
  )
}

export default withConfig(ModalButtons)

export const ButtonsWrapper = styled.div<{ $vertical?: boolean }>`
  display: grid;
  align-self: center;

  ${({ $vertical }) =>
    $vertical
      ? css`
          grid-template-columns: minmax(15.6rem, 1fr);
          grid-auto-flow: row;
          grid-auto-rows: auto;
          row-gap: 1.4rem;
        `
      : css`
          width: 100%;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto;
          column-gap: 2.4rem;
        `}

  button {
    flex: 1;
    min-height: 3.2rem;
  }
`
