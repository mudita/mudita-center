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

const selectModalsToRender = createSelector(selectViewConfig, (config) => {
  return Object.entries(config || {})
    .filter(([, { component }]) => ["modal", "text-modal"].includes(component))
    .map(([key]) => key)
})

interface Props {
  viewKey: string
}

export const GenericModals: FunctionComponent<Props> = ({ viewKey }) => {
  const modalsToRender = useSelector((state: ReduxRootState) =>
    selectModalsToRender(state, { viewKey })
  )
  const modalsToRenderDependency = JSON.stringify(modalsToRender)

  return useMemo(() => {
    if (isEmpty(modalsToRender)) {
      return null
    }
    return (
      <>
        {modalsToRender.map((modalKey) => {
          return (
            <RecursiveLayout
              key={modalKey}
              viewKey={viewKey}
              componentKey={modalKey}
            />
          )
        })}
      </>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalsToRenderDependency, viewKey])
}

export default GenericModals
