import React, { useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import TetheringUI from "Renderer/modules/tethering/tethering-ui.component"

interface TetheringProps {
  disconnectedDevice: boolean
}

const Tethering: FunctionComponent<TetheringProps> = ({
  disconnectedDevice,
}) => {
  const [tetheringEnabled, setTetheringEnabled] = useState(false)
  return (
    <TetheringUI
      tetheringEnabled={tetheringEnabled}
      onToggleTethering={setTetheringEnabled}
      disconnectedDevice={disconnectedDevice}
    />
  )
}

export default Tethering
