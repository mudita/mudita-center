/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled, { css } from "styled-components"
import { ModalCloseButtonTestIds } from "e2e-test-ids"
import { APIFC, IconType } from "generic-view/utils"
import { ModalCloseButtonConfig } from "generic-view/models"
import { ButtonBase } from "../../../buttons/button-base/button-base"
import { iconButtonStyles } from "../../../shared/button"
import { Icon } from "../../../icon/icon"

export const ModalCloseButton: APIFC<undefined, ModalCloseButtonConfig> = ({
  data,
  config,
  className = "",
  ...rest
}) => {
  if (!config?.actions) return null
  return (
    <ModalClose
      actions={config.actions}
      data-testid={ModalCloseButtonTestIds.IconButton}
      className={"modal-close-icon-button " + className}
      {...rest}
    >
      <ModalCloseIcon />
    </ModalClose>
  )
}

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
