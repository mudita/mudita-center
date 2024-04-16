/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, HTMLAttributes } from "react"
import { ButtonAction } from "generic-view/utils"
import { useButtonAction } from "./use-button-action"
import { DefaultButton } from "../../shared/button"

interface Props extends HTMLAttributes<HTMLButtonElement> {
  action: ButtonAction
  viewKey?: string
  disabled?: boolean
}

export const ButtonBase: FunctionComponent<Props> = ({ action, ...props }) => {
  const callButtonAction = useButtonAction(props.viewKey as string)
  const callAction = () => callButtonAction(action)

  return <DefaultButton {...props} onClick={callAction} type={"button"} />
}
