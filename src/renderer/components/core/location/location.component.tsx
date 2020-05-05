import FunctionComponent from "Renderer/types/function-component.interface"
import React from "react"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { noop } from "Renderer/utils/noop"

interface Props {
  buttonLabel: string
  openDialog?: () => void
}

const Location: FunctionComponent<Props> = ({
  buttonLabel,
  openDialog = noop,
}) => {
  return <ButtonComponent onClick={openDialog} label={buttonLabel} />
}

export default Location
