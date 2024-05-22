/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import Button, {
  ButtonComponentProps as ButtonProps,
} from "Core/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "Core/__deprecated__/renderer/components/core/button/button.config"
import styled, { css } from "styled-components"
import {
  transitionTime,
  transitionTimingFunction,
} from "Core/core/styles/theming/theme-getters"
import { noop } from "Core/__deprecated__/renderer/utils/noop"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"

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
      Icon={updating ? IconType.Refresh : undefined}
      onClick={onClick}
      updating={updating}
      disabled={updating}
      {...rest}
    />
  )
}

export default UpdateButtonComponent
