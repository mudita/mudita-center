/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { Button } from "../button/button"
import { IconType } from "app-theme/models"

interface Props {
  onClick?: VoidFunction
}

export const ModalCloseButton: FunctionComponent<Props> = ({ onClick }) => {
  return (
    <ModalClose
      onClick={onClick}
      icon={IconType.Close}
      type={"icon"}
      size={"big"}
    />
  )
}

const ModalClose = styled(Button)`
  position: absolute;
  right: ${({ theme }) => theme.app.space.xl};
  top: ${({ theme }) => theme.app.space.xl};
  z-index: 2;
`
