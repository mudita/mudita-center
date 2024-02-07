/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/* eslint-disable @typescript-eslint/no-unsafe-return */

import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { setDeviceInitializationStatus } from "Core/device-initialization/actions/base.action"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import {
  getAPIConfig,
  selectActiveDevice,
  selectActiveDeviceMenuElements,
  selectApiError,
} from "generic-view/store"
import { ApiError } from "device/models"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import {
  IconButton,
  ModalBase,
  ModalCenteredContent,
  ModalCloseIcon,
  ModalTitleIcon,
  SpinnerLoader,
} from "generic-view/ui"
import { GenericThemeProvider } from "generic-view/theme"
import { IconType } from "generic-view/utils"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"
import ReactModal from "react-modal"
import styled from "styled-components"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"

const messages = defineMessages({
  connectingModalParagraph: {
    id: "module.onboarding.connectingMessage",
  },
  lockedModalHeadline: {
    id: "component.deviceLockedModalHeadline",
  },
  lockedModalParagraph: {
    id: "component.deviceLockedModalParagraph",
  },
})

export const APIDeviceInitializationModalFlow: FunctionComponent = () => {
  const dispatch = useDispatch<Dispatch>()
  const history = useHistory()
  const firstRenderTime = useRef(Date.now())
  const deviceLocked = useSelector((state: ReduxRootState) => {
    return selectApiError(state, ApiError.DeviceLocked)
  })
  const menuElements = useSelector(selectActiveDeviceMenuElements)
  const deviceId = useSelector(selectActiveDevice)

  const onModalClose = () => {
    // TODO: handle modal close
  }

  useEffect(() => {
    if (!deviceLocked && deviceId) {
      dispatch(getAPIConfig({ deviceId }))
      dispatch(
        setDeviceInitializationStatus(DeviceInitializationStatus.Initialized)
      )
    }
  }, [deviceId, deviceLocked, dispatch])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (!deviceLocked && menuElements) {
      const firstMenuItemUrl = menuElements[0]?.items?.[0]?.button.url
      const elapsedTime = Date.now() - firstRenderTime.current
      const delay = Math.max(0, 1000 - elapsedTime)

      timeout = setTimeout(() => {
        history.push(firstMenuItemUrl || URL_MAIN.news)
      }, delay)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [deviceId, deviceLocked, history, menuElements])

  return (
    <GenericThemeProvider>
      <Wrapper>
        <ReactModal
          isOpen
          overlayClassName="generic-modal-overlay"
          style={{
            overlay: {
              zIndex: ModalLayers.Default,
            },
            content: {
              backgroundColor: "transparent",
              border: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
        >
          <SpinnerLoader />
          <ConnectingText>
            {intl.formatMessage(messages.connectingModalParagraph)}
          </ConnectingText>
        </ReactModal>
        <ModalBase
          opened={deviceLocked}
          variant={"small"}
          overlayHidden
          closeButton={
            <IconButton onClick={onModalClose}>
              <ModalCloseIcon />
            </IconButton>
          }
        >
          <ModalCenteredContent>
            <ModalTitleIcon data={{ type: IconType.Mudita }} />
            <h1>{intl.formatMessage(messages.lockedModalHeadline)}</h1>
            <p>{intl.formatMessage(messages.lockedModalParagraph)}</p>
          </ModalCenteredContent>
        </ModalBase>
      </Wrapper>
    </GenericThemeProvider>
  )
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: ${({ theme }) => theme.color.grey6};
`

const ConnectingText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.headline3};
  line-height: ${({ theme }) => theme.lineHeight.headline3};
  color: ${({ theme }) => theme.color.white};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin: 2.4rem 0 0;
`
