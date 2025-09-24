/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import styled, { css, keyframes } from "styled-components"

export const toastAnimationDuration = 300

interface ToastConfig {
  key: string
  content: ReactNode
}

interface ToastContextValue {
  queue: ToastConfig[]
  addToast: (toast: Partial<ToastConfig>) => void
  removeToast: (key?: string) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export const useToastContext = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToastContext must be used inside ToastProvider")
  return ctx
}

const ToastProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [queue, setQueue] = useState<ToastConfig[]>([])

  const addToast = useCallback(
    ({ key, content = "" }: Partial<ToastConfig>) => {
      const ensuredKey = key ?? crypto.randomUUID()
      setQueue((prev) => [...prev, { key: ensuredKey, content }])
    },
    []
  )

  const removeToast = useCallback((key?: string) => {
    setQueue((prev) => {
      if (!key) {
        return prev.slice(1)
      }
      return prev.filter((t) => t.key !== key)
    })
  }, [])

  return (
    <ToastContext.Provider value={{ queue, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}

interface ToastProps {
  visibilityDuration?: number
  componentKey: string
}

export const Toast: FunctionComponent<ToastProps & PropsWithChildren> & {
  Context: typeof ToastContext
  Provider: typeof ToastProvider
} = ({ visibilityDuration, componentKey, children }) => {
  const toastVisibilityDuration = visibilityDuration ?? 2000
  const { queue, removeToast } = useToastContext()

  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const isToastOpened = queue.length > 0 && queue[0].key === componentKey

    if (isToastOpened) {
      setExiting(false)
      setVisible(true)

      const visibilityTimeout = setTimeout(() => {
        setExiting(true)
      }, toastVisibilityDuration)

      return () => clearTimeout(visibilityTimeout)
    }
    return undefined
  }, [componentKey, queue, toastVisibilityDuration])

  useEffect(() => {
    if (exiting) {
      const removeTimeout = setTimeout(() => {
        setVisible(false)
        removeToast(componentKey)
      }, toastAnimationDuration)

      return () => clearTimeout(removeTimeout)
    }
    return undefined
  }, [exiting, removeToast, componentKey])

  if (!visible) {
    return null
  }

  return (
    <ToastWrapper
      $exiting={exiting}
      $animationDuration={toastAnimationDuration}
    >
      {children}
    </ToastWrapper>
  )
}

Toast.Context = ToastContext
Toast.Provider = ToastProvider

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

export const ToastContainer = () => {
  const { queue } = useToastContext()

  return (
    <ToastContainerWrapper>
      {queue.map((toast) => (
        <Toast key={toast.key} componentKey={toast.key}>
          {toast.content}
        </Toast>
      ))}
    </ToastContainerWrapper>
  )
}

const ToastContainerWrapper = styled.div`
  position: fixed;
  right: 3.2rem;
  bottom: 3.2rem;
  z-index: 5;
`

const ToastWrapper = styled.div<{
  $exiting: boolean
  $animationDuration: number
}>`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 2rem;
  width: max-content;
  background-color: ${({ theme }) => theme.app.color.white};
  box-shadow: 0 0.2rem 3rem rgba(0, 0, 0, 0.0793816);
  border-radius: ${({ theme }) => theme.app.radius.sm};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.4rem;

  animation: ${({ $exiting, $animationDuration }) =>
    $exiting
      ? css`
          ${slideOut} ${$animationDuration}ms ease-in forwards
        `
      : css`
          ${slideIn} ${$animationDuration}ms ease-out
        `};

  p {
    color: ${({ theme }) => theme.app.color.black};
  }
`
