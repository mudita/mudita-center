/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useRef, useState } from "react"
import { APIFC } from "generic-view/utils"
import styled, { css, keyframes } from "styled-components"
import { ToastConfig } from "generic-view/models"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { useDispatch, useSelector } from "react-redux"
import { removeToast } from "generic-view/store"
import { theme } from "generic-view/theme"

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
  const [opened, setOpened] = useState(false)
  const [visible, setVisible] = useState(false)

  const animationTimeoutRef = useRef<NodeJS.Timeout>()
  const visibilityTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const toastOpened =
      toastsQueue.length > 0 && toastsQueue[0].key === props.componentKey
    setOpened(toastOpened)
    if (toastOpened) {
      setVisible(true)
    }
  }, [props.componentKey, toastsQueue])

  useEffect(() => {
    if (visible) {
      visibilityTimeoutRef.current = setTimeout(() => {
        setVisible(false)
      }, toastVisibilityDuration + theme.animation.toast.duration)
    } else {
      animationTimeoutRef.current = setTimeout(() => {
        setOpened(false)
      }, theme.animation.toast.duration)
    }
    return () => {
      clearTimeout(visibilityTimeoutRef.current)
      clearTimeout(animationTimeoutRef.current)
    }
  }, [toastVisibilityDuration, visible])

  useEffect(() => {
    if (!opened) {
      dispatch(removeToast())
    }
  }, [dispatch, opened])

  if (!opened) return null
  return (
    <ToastWrapper {...props} $opened={visible}>
      {children}
    </ToastWrapper>
  )
}

const transitionIn = keyframes`
  from {
    transform: translateX(calc(100% + 7rem));
  }
  to {
    transform: translateX(0);
  }
`

const transitionOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(100% + 7rem));
  }
`

const ToastWrapper = styled.div<{
  $opened?: boolean
}>`
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
  animation-duration: ${({ theme }) => theme.animation.toast.duration}ms;
  animation-timing-function: ${({ theme }) => theme.animation.toast.easing};

  p {
    color: ${({ theme }) => theme.color.black};
  }

  ${({ $opened }) => {
    return $opened
      ? css`
          animation-name: ${transitionIn};
        `
      : css`
          animation-name: ${transitionOut};
        `
  }}
`
