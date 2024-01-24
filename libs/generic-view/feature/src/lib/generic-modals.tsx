/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import RecursiveLayout from "./recursive-layout"

interface Props {
  viewKey: string
}

export const GenericModals: FunctionComponent<Props> = ({ viewKey }) => {
  const { views } = useSelector((state: ReduxRootState) => state.genericViews)

  // const modalsToRender = Object.entries(views[viewKey].layout)
  //   .filter(([, { component }]) => component === "modal")
  //   .map(([key]) => key)
  const modalsToRender: string[] = []
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
}

export default GenericModals
