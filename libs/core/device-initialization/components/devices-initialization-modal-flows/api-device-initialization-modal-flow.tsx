/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/* eslint-disable @typescript-eslint/no-unsafe-return */

import React, { useCallback, useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  selectActiveDeviceMenuElements,
  selectApiError,
  selectDataMigrationSourceDevice,
  selectDataMigrationTargetDevice,
  setSourceDevice,
} from "generic-view/store"
import { ApiError } from "device/models"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import { Modal, SpinnerLoader } from "generic-view/ui"
import { GenericThemeProvider } from "generic-view/theme"
import { ButtonAction, IconType } from "generic-view/utils"
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
import { useDataMigrationDeviceSelector } from "shared/feature"

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
  const selectDevice = useDataMigrationDeviceSelector()
  const firstRenderTime = useRef(Date.now())
  const deviceLocked = useSelector((state: ReduxRootState) => {
    return selectApiError(state, ApiError.DeviceLocked)
  })
  const menuElements = useSelector(selectActiveDeviceMenuElements)
  const [pathToGoBack] = useFilteredRoutesHistory([
    URL_MAIN.root,
    ...Object.values(URL_ONBOARDING),
    ...Object.values(URL_DISCOVERY_DEVICE),
    ...Object.values(URL_DEVICE_INITIALIZATION),
  ])
  const dataMigrationSourceDevice = useSelector(selectDataMigrationSourceDevice)
  const dataMigrationTargetDevice = useSelector(selectDataMigrationTargetDevice)

  const targetPath = useMemo(() => {
    const firstMenuItemUrl = menuElements?.[0]?.items?.[0]?.button.url
    const commonPaths = [
      URL_MAIN.root,
      URL_MAIN.news,
      URL_MAIN.settings,
      URL_ONBOARDING.root,
      URL_ONBOARDING.welcome,
    ]
    if (commonPaths.includes(pathToGoBack as (typeof commonPaths)[number])) {
      return pathToGoBack
    }
    if (
      pathToGoBack === URL_MAIN.dataMigration &&
      dataMigrationSourceDevice &&
      dataMigrationTargetDevice
    ) {
      return "/generic/mc-data-migration"
    }
    return firstMenuItemUrl
  }, [
    dataMigrationSourceDevice,
    dataMigrationTargetDevice,
    menuElements,
    pathToGoBack,
  ])

  const onModalClose = useCallback(async () => {
    if (pathToGoBack === URL_MAIN.dataMigration && dataMigrationSourceDevice) {
      await selectDevice(
        dataMigrationSourceDevice.serialNumber,
        URL_MAIN.dataMigration
      )
      dispatch(setSourceDevice(undefined))
    } else {
      history.push(pathToGoBack || URL_MAIN.news)
    }
  }, [dataMigrationSourceDevice, dispatch, history, pathToGoBack, selectDevice])

  const modalCloseAction: ButtonAction = {
    type: "custom",
    callback: onModalClose,
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (!deviceLocked && menuElements && targetPath) {
      const elapsedTime = Date.now() - firstRenderTime.current
      const delay = Math.max(0, 1000 - elapsedTime)

      dispatch(
        setDeviceInitializationStatus(DeviceInitializationStatus.Initialized)
      )
      timeout = setTimeout(() => {
        history.push(targetPath)
      }, delay)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [deviceLocked, dispatch, history, menuElements, targetPath])

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
        <Modal
          componentKey={"device-initialization"}
          config={{
            defaultOpened: deviceLocked,
            size: "small",
            closeButtonAction: modalCloseAction,
            overlayHidden: true,
          }}
        >
          <Modal.TitleIcon config={{ type: IconType.Mudita }} />
          <Modal.Title>
            {intl.formatMessage(messages.lockedModalHeadline)}
          </Modal.Title>
          <p>{intl.formatMessage(messages.lockedModalParagraph)}</p>
        </Modal>
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
