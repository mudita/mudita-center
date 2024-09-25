/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useMemo } from "react"
import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import RecursiveLayout from "./recursive-layout"
import { selectViewConfig } from "generic-view/store"
import { createSelector } from "reselect"
import { isEmpty } from "lodash"
import styled from "styled-components"

const selectToastsToRender = createSelector(selectViewConfig, (config) => {
  return Object.entries(config || {})
    .filter(([, { component }]) => component === "toast")
    .map(([key]) => key)
})

interface Props {
  viewKey: string
}

export const GenericToasts: FunctionComponent<Props> = ({ viewKey }) => {
  const toastsToRender = useSelector((state: ReduxRootState) =>
    selectToastsToRender(state, { viewKey })
  )
  const toastsToRenderDependency = JSON.stringify(toastsToRender)

  return useMemo(() => {
    if (isEmpty(toastsToRender)) {
      return null
    }
    return (
      <ToastsWrapper>
        {toastsToRender.map((toastKey) => {
          return (
            <RecursiveLayout
              key={toastKey}
              viewKey={viewKey}
              componentKey={toastKey}
            />
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
