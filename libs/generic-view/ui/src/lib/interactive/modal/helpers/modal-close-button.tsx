/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled, { css } from "styled-components"
import { APIFC, ButtonAction, IconType } from "generic-view/utils"
import { ButtonBase } from "../../../buttons/button-base/button-base"
import { iconButtonStyles } from "../../../shared/button"
import Icon from "../../../icon/icon"

interface Config {
  action?: ButtonAction
}

export const ModalCloseButton: APIFC<undefined, Config> = ({
  data,
  config,
  className,
  ...rest
}) => {
  if (!config?.action) return null
  return (
    <ModalClose
      action={config.action}
      test-id={"modal-close-button"}
      className={"modal-close-button " + className}
      {...rest}
    >
      <ModalCloseIcon />
    </ModalClose>
  )
}

export default ModalCloseButton

export const ModalCloseIcon = styled(Icon).attrs({
  data: { type: IconType.Close },
})`
  cursor: pointer;
  width: 1.6rem;
  height: 1.6rem;
`

const closeButtonStyles = css`
  position: absolute;
  right: ${({ theme }) => theme.space.xl};
  top: ${({ theme }) => theme.space.xl};
  z-index: 2;
`

const ModalClose = styled(ButtonBase)`
  ${iconButtonStyles};
  ${closeButtonStyles};
`
