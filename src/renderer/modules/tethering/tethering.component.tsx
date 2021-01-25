import React, { useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import TetheringUI from "Renderer/modules/tethering/tethering-ui.component"

interface TetheringProps {
  deviceConnected: boolean
}

const Tethering: FunctionComponent<TetheringProps> = ({ deviceConnected }) => {
  const [tetheringEnabled, setTetheringEnabled] = useState(false)
  return (
    <TetheringUI
      tetheringEnabled={tetheringEnabled}
      onToggleTethering={setTetheringEnabled}
      deviceConnected={deviceConnected}
    />
  )
}

export default Tethering
