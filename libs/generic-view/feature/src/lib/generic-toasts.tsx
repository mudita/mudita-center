/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useMemo } from "react"
import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectViewConfig } from "generic-view/store"
import { createSelector } from "reselect"
import { isEmpty } from "lodash"
import { RecursiveLayout } from "./recursive-layout"
import styled from "styled-components"
import { Icon, Toast, Typography } from "generic-view/ui"

const selectToastsToRender = createSelector(selectViewConfig, (config) => {
  return Object.entries(config || {})
    .filter(([, { component }]) => component === "toast")
    .map(([key]) => key)
})

interface Props {
  viewKey: string
}

export const GenericToasts: FunctionComponent<Props> = ({ viewKey }) => {
  const genericToastsToRender = useSelector((state: ReduxRootState) =>
    selectToastsToRender(state, { viewKey })
  )
  const predefinedToastsToRender = useSelector(
    (state: ReduxRootState) => state.genericToasts.queue
  ).filter((toast) => toast.text || toast.icon)

  const toastsToRender = [...genericToastsToRender, ...predefinedToastsToRender]

  const toastsToRenderDependency = JSON.stringify(toastsToRender)

  return useMemo(() => {
    if (isEmpty(toastsToRender)) {
      return null
    }
    return (
      <ToastsWrapper>
        {genericToastsToRender.map((toastKey) => {
          return (
            <RecursiveLayout
              key={toastKey}
              viewKey={viewKey}
              componentKey={toastKey}
            />
          )
        })}
        {predefinedToastsToRender.map(({ key, text, icon }) => {
          return (
            <Toast key={key} componentKey={key}>
              {icon && <Icon config={{ type: icon }} />}
              <Typography.P1>{text}</Typography.P1>
            </Toast>
          )
        })}
      </ToastsWrapper>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastsToRenderDependency, viewKey])
}

const ToastsWrapper = styled.div`
  position: fixed;
  right: 3.2rem;
  bottom: 3.2rem;
  z-index: 3;
`
