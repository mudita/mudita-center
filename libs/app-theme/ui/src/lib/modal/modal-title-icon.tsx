/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled, { css, keyframes } from "styled-components"
import { IconType } from "app-theme/models"
import { Icon } from "../icon/icon"

interface Props {
  type?: IconType
}

export const ModalTitleIcon: FunctionComponent<Props> = ({ type, ...rest }) => {
  if (!type) return null
  const spin = type === IconType.Spinner
  return (
    <TitleIconWrapper {...rest}>
      <TitleIcon type={type} $spin={spin} />
    </TitleIconWrapper>
  )
}

export const TitleIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 6.8rem;
  min-width: 6.8rem;
  height: 6.8rem;
  min-height: 6.8rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.app.color.grey5};
  align-self: center;
`

const TitleIcon = styled(Icon)<{ $spin?: boolean }>`
  height: 4.08rem;
  width: 4.08rem;
  ${({ $spin }) => $spin && spinAnimation};
  color: ${({ theme }) => theme.app.color.black};
`

const spin = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
})

const spinAnimation = css`
  animation: ${spin} 1s steps(12) infinite;
`
