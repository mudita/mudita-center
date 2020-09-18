import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { TetheringTestIds } from "Renderer/modules/tethering/screens/tethering.enum"

const TetheringEnabled: FunctionComponent = () => (
  <div data-testid={TetheringTestIds.EnabledWrapper}>Tethering enabled</div>
)

export default TetheringEnabled
