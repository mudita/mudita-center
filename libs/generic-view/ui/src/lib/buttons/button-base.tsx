/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, HTMLAttributes } from "react"
import styled from "styled-components"
import {
  closeAllModals,
  closeDomainModals,
  closeModal,
  openModal,
  replaceModal,
} from "generic-view/store"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { ButtonAction, useScreenTitle } from "generic-view/utils"

interface Props extends HTMLAttributes<HTMLButtonElement> {
  action: ButtonAction
  viewKey?: string
}

export const ButtonBase: FunctionComponent<Props> = ({ action, ...props }) => {
  const dispatch = useDispatch()
  const currentViewName = useScreenTitle(props.viewKey as string)
  const navigate = useHistory()

  const callAction = () => {
    switch (action.type) {
      case "open-modal":
        dispatch(openModal({ key: action.modalKey, domain: action.domain }))
        break
      case "close-modal":
        dispatch(closeModal({ key: action.modalKey }))
        break
      case "replace-modal":
        dispatch(replaceModal({ key: action.modalKey, domain: action.domain }))
        break
      case "close-domain-modals":
        dispatch(closeDomainModals({ domain: action.domain }))
        break
      case "close-all-modals":
        dispatch(closeAllModals())
        break
      case "navigate":
        navigate.push({
          pathname: `/generic/${action.viewKey}`,
          state: {
            previousViewName: currentViewName,
          },
        })
        break
    }
  }

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
