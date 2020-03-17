import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import Button, { Props } from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import Upload from "Renderer/svg/upload.svg"
import { noop } from "Renderer/utils/noop"
import styled, { css } from "styled-components"
import { useState } from "react"

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
const UpdateButton = styled(Button)`
  display: flex;
  width: auto;
  svg {
    ${rotateAnimation};
  }
`

const UpdateButtonComponent: FunctionComponent<Props> = () => {
  const [state, setState] = useState()
  return (
    <UpdateButton
      displayStyle={DisplayStyle.Link2}
      label="Update"
      target="_blank"
      Icon={Upload}
      onClick={noop}
    />
  )
}

export default UpdateButtonComponent
