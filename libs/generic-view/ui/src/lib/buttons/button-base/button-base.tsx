/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, HTMLAttributes } from "react"
import { useButtonAction } from "./use-button-action"
import { DefaultButton } from "../../shared/button"
import { ButtonActions } from "generic-view/models"

interface Props extends HTMLAttributes<HTMLButtonElement> {
  actions: ButtonActions
  viewKey?: string
  disabled?: boolean
}

export const ButtonBase: FunctionComponent<Props> = ({ actions, ...props }) => {
  const callButtonAction = useButtonAction(props.viewKey as string)
  const callAction = () => callButtonAction(actions)

  return <DefaultButton {...props} onClick={callAction} type={"button"} role="button" />
}
