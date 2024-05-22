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
import {
  selectActiveDevice,
  selectActiveDeviceMenuElements,
  selectApiError,
} from "generic-view/store"
import { ApiError } from "device/models"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import {
  closeButtonStyles,
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
import {
  URL_DEVICE_INITIALIZATION,
  URL_DISCOVERY_DEVICE,
  URL_MAIN,
  URL_ONBOARDING,
} from "Core/__deprecated__/renderer/constants/urls"
import { useFilteredRoutesHistory } from "shared/utils"
import { setDeviceInitializationStatus } from "Core/device-initialization/actions/base.action"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"

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
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()
  const firstRenderTime = useRef(Date.now())
  const deviceLocked = useSelector((state: ReduxRootState) => {
    return selectApiError(state, ApiError.DeviceLocked)
  })
  const menuElements = useSelector(selectActiveDeviceMenuElements)
  const deviceId = useSelector(selectActiveDevice)
  const [pathToGoBack] = useFilteredRoutesHistory([
    URL_MAIN.root,
    ...Object.values(URL_ONBOARDING),
    ...Object.values(URL_DISCOVERY_DEVICE),
    ...Object.values(URL_DEVICE_INITIALIZATION),
  ])

  const onModalClose = () => {
    history.push(pathToGoBack || URL_MAIN.news)
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (!deviceLocked && menuElements) {
      const firstMenuItemUrl = menuElements[0]?.items?.[0]?.button.url
      const elapsedTime = Date.now() - firstRenderTime.current
      const delay = Math.max(0, 1000 - elapsedTime)

      dispatch(
        setDeviceInitializationStatus(DeviceInitializationStatus.Initialized)
      )
      timeout = setTimeout(() => {
        history.push(pathToGoBack || firstMenuItemUrl || URL_MAIN.news)
      }, delay)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [dispatch, deviceId, deviceLocked, history, menuElements, pathToGoBack])

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
          size={"small"}
          overlayHidden
          closeButton={
            <CloseButton onClick={onModalClose}>
              <ModalCloseIcon />
            </CloseButton>
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

const CloseButton = styled(IconButton)`
  ${closeButtonStyles};
`
