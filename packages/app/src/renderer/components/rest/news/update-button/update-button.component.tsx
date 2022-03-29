/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Button, {
  Props as ButtonProps,
} from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import styled, { css } from "styled-components"
import {
  transitionTime,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"
import { noop } from "Renderer/utils/noop"
import { intl } from "Renderer/utils/intl"
import { IconType } from "Renderer/components/core/icon/icon-type"

const rotateAnimation = css`
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  animation: rotate ${transitionTime("slow")} infinite
    ${transitionTimingFunction("easeInOut")};
`
const UpdateButton = styled(Button)<{ updating?: boolean }>`
  display: flex;
  width: auto;
  svg {
    ${({ updating }) => updating && rotateAnimation}
  }
`

export interface UpdateButtonProps {
  onClick?: () => void
  updating?: boolean
  label?: string
}

const UpdateButtonComponent: FunctionComponent<
  UpdateButtonProps & ButtonProps
> = ({
  onClick = noop,
  updating = false,
  label = intl.formatMessage({ id: "module.news.updateButtonLabel" }),
  ...rest
}) => {
  return (
    <UpdateButton
      displayStyle={DisplayStyle.LinkWithParagraph}
      label={label}
      Icon={IconType.Refresh}
      onClick={onClick}
      updating={updating}
      disabled={updating}
      {...rest}
    />
  )
}

export default UpdateButtonComponent
