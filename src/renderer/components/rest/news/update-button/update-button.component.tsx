import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import Button, {
  Props as ButtonProps,
} from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import styled, { css } from "styled-components"
import { Type } from "Renderer/components/core/icon/icon.config"
import { noop } from "Renderer/utils/noop"

const rotateAnimation = css`
  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }

  animation: rotate 2s infinite linear;
`
const UpdateButton = styled(Button)<{ isUpadating?: boolean }>`
  display: flex;
  width: auto;
  svg {
    ${({ isUpadating }) => isUpadating && rotateAnimation}
  }
`

interface UpdateButtonProps {
  onUpdating: () => void
  isUpadating?: boolean
}

const UpdateButtonComponent: FunctionComponent<UpdateButtonProps &
  ButtonProps> = ({ onUpdating, isUpadating }) => {
  console.log(isUpadating)
  return (
    <UpdateButton
      displayStyle={DisplayStyle.Link2}
      label="Update"
      target="_blank"
      Icon={Type.Refresh}
      onClick={onUpdating}
      isUpadating={isUpadating}
    />
  )
}

export default UpdateButtonComponent
