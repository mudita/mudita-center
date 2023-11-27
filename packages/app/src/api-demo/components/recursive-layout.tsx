/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { useSelector } from "react-redux"
import { ComponentPropsByName } from "../output/overview-output"
import { APIFC } from "App/api-demo/models/api-fc.types"
import { apiComponents } from "./api-components"
import { APIComponents } from "App/api-demo/models/api-components.types"

export const RecursiveLayout = ({
  component,
  parameters,
  childrenKeys,
}: ComponentPropsByName<keyof APIComponents>) => {
  const { layout } = useSelector((state: ReduxRootState) => state.generic)
  const Component = apiComponents[component] as APIFC<typeof parameters>

  return (
    <Component parameters={parameters}>
      {childrenKeys?.map((key) => {
        const item = layout[key]
        return <RecursiveLayout key={key} {...item} />
      })}
    </Component>
  )
}
