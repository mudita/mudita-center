import React, { useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import TetheringUI from "Renderer/modules/tethering/tethering-ui.component"

const Tethering: FunctionComponent = () => {
  const [tetheringEnabled, setTetheringEnabled] = useState(false)
  return (
    <TetheringUI
      tetheringEnabled={tetheringEnabled}
      onToggleTethering={setTetheringEnabled}
    />
  )
}

export default Tethering
