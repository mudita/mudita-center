/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { IconType } from "app-theme/models"
import { Messages } from "app-localize/utils"
import { Icon } from "../icon/icon"
import { Typography } from "../typography/typography"

interface Props {
  opened?: boolean
  message: Messages["id"]
}

export const LoadingState: FunctionComponent<
  Props & { className?: string }
> = ({ opened, message, ...props }) => {
  if (!opened) {
    return null
  }

  return (
    <Wrapper {...props}>
      <Typography.H3 message={message} />
      <Icon type={IconType.Spinner} size={4.8} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.app.color.white};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.4rem 0;
`
