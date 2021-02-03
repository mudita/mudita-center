import * as React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Button, {
  Props as ButtonProps,
} from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import styled, { css } from "styled-components"
import { Type } from "Renderer/components/core/icon/icon.config"
import {
  transitionTime,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"
import { noop } from "Renderer/utils/noop"
import { intl } from "Renderer/utils/intl"

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

interface UpdateButtonProps {
  onClick?: () => void
  updating?: boolean
  label?: string
}

const UpdateButtonComponent: FunctionComponent<
  UpdateButtonProps & ButtonProps
> = ({
  onClick = noop,
  updating = false,
  label = intl.formatMessage({ id: "view.name.news.updateButtonLabel" }),
  ...rest
}) => {
  return (
    <UpdateButton
      displayStyle={DisplayStyle.Link2}
      label={label}
      Icon={Type.Refresh}
      onClick={onClick}
      updating={updating}
      disabled={updating}
      {...rest}
    />
  )
}

export default UpdateButtonComponent
