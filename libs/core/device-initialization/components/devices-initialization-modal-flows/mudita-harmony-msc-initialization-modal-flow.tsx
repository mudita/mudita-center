/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/* eslint-disable @typescript-eslint/no-unsafe-return */

import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { defineMessages } from "react-intl"
import styled from "styled-components"
import { setDeviceInitializationStatus } from "Core/device-initialization/actions/base.action"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { useHistory } from "react-router-dom"
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

export const HarmonyMscInitializationModalFlow: FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    dispatch(
      setDeviceInitializationStatus(DeviceInitializationStatus.Initialized)
    )

    history.push(URL_MAIN.recoveryMode)
  }, [])

  return <></>
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
