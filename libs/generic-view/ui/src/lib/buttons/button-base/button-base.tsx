/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, HTMLAttributes } from "react"
import styled from "styled-components"
import { ButtonAction } from "generic-view/utils"
import { useButtonAction } from "./use-button-action"

interface Props extends HTMLAttributes<HTMLButtonElement> {
  action: ButtonAction
  viewKey?: string
}

export const ButtonBase: FunctionComponent<Props> = ({ action, ...props }) => {
  const callButtonAction = useButtonAction(props.viewKey as string)
  const callAction = () => callButtonAction(action)

  return <Button {...props} onClick={callAction} />
}

const Button = styled.button`
  border: none;
  outline: none;
  background: transparent;
  box-sizing: border-box;
  cursor: pointer;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.4rem;
`
