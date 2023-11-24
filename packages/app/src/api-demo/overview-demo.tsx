import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { RecursiveLayout } from "./components"

export const OverviewDemo: FunctionComponent = () => {
  const { layout, data } = useSelector((state: ReduxRootState) => state.generic)

  return (
    <RecursiveLayout
      componentKey={"main"}
      component={layout.main.component}
      parameters={layout.main.parameters}
      childrenKeys={layout.main.childrenKeys}
    />
  )
}
