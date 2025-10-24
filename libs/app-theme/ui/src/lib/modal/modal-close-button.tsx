/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { IconSize, IconType, ModalTestId } from "app-theme/models"
import { IconButton } from "../icon-button/icon-button"

interface Props {
  onClick?: VoidFunction
}

export const ModalCloseButton: FunctionComponent<Props> = ({ onClick }) => {
  return (
    <ModalClose
      onClick={onClick}
      icon={IconType.Close}
      size={IconSize.Big}
      data-testid={ModalTestId.CloseButton}
    />
  )
}

export const ModalClose = styled(IconButton)`
  position: absolute;
  right: ${({ theme }) => theme.app.space.xl};
  top: ${({ theme }) => theme.app.space.xl};
  z-index: 2;
`
