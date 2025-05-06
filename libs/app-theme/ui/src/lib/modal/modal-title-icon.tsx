/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { IconType, ModalTestId } from "app-theme/models"
import { Icon } from "../icon/icon"

interface Props {
  type: IconType
}

export const ModalTitleIcon: FunctionComponent<Props> = ({ type, ...rest }) => {
  return (
    <TitleIconWrapper {...rest}>
      <TitleIcon type={type} data-testid={ModalTestId.TitleIcon} />
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

const TitleIcon = styled(Icon)`
  height: 4.08rem;
  width: 4.08rem;
  color: ${({ theme }) => theme.app.color.black};
`
