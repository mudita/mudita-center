/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { APIFC } from "generic-view/utils"
import styled, { css, keyframes } from "styled-components"
import { ToastConfig } from "generic-view/models"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { useDispatch, useSelector } from "react-redux"
import { removeToast } from "generic-view/store"

export const toastAnimationDuration = 300

export const Toast: APIFC<undefined, ToastConfig> = ({
  config,
  children,
  ...props
}) => {
  const toastVisibilityDuration = config?.visibilityDuration ?? 2000
  const dispatch = useDispatch<Dispatch>()
  const toastsQueue = useSelector(
    (state: ReduxRootState) => state.genericToasts.queue
  )

  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)
  useEffect(() => {
    const isToastOpened =
      toastsQueue.length > 0 && toastsQueue[0].key === props.componentKey

    if (isToastOpened) {
      setExiting(false)
      setVisible(true)

      const visibilityTimeout = setTimeout(() => {
        setExiting(true)
      }, toastVisibilityDuration)

      return () => clearTimeout(visibilityTimeout)
    }
    return undefined
  }, [props.componentKey, toastsQueue, toastVisibilityDuration])

  useEffect(() => {
    return () => {
      dispatch(removeToast())
    }
  }, [dispatch])

  useEffect(() => {
    if (exiting) {
      const removeTimeout = setTimeout(() => {
        setVisible(false)
        dispatch(removeToast())
      }, toastAnimationDuration)

      return () => clearTimeout(removeTimeout)
    }
    return undefined
  }, [exiting, dispatch])

  if (!visible) return null

  return (
    <ToastWrapper {...props} $exiting={exiting} $animationDuration={toastAnimationDuration}>
      {children}
    </ToastWrapper>
  )
}

const slideIn = keyframes`
  from {
    transform: translateX(calc(100% + 7rem));
  }
  to {
    transform: translateX(0);
  }
`

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(100% + 7rem));
  }
`

const ToastWrapper = styled.div<{ $exiting: boolean; $animationDuration: number }>`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 2rem;
  width: max-content;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0 0.2rem 3rem rgba(0, 0, 0, 0.0793816);
  border-radius: ${({ theme }) => theme.radius.sm};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.4rem;

  animation: ${({ $exiting, $animationDuration }) =>
    $exiting
      ? css`${slideOut} ${$animationDuration}ms ease-in forwards`
      : css`${slideIn} ${$animationDuration}ms ease-out`};

  p {
    color: ${({ theme }) => theme.color.black};
  }
`
