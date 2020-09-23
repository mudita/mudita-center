import React, { useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import TetheringUI from "Renderer/modules/tethering/tethering-ui.component"
import { noop } from "Renderer/utils/noop"

interface TetheringProps {
  disconnectedDevice: boolean
  disconnectDevice?: () => void
}

const Tethering: FunctionComponent<TetheringProps> = ({
  disconnectedDevice,
  disconnectDevice = noop,
}) => {
  const [tetheringEnabled, setTetheringEnabled] = useState(false)
  return (
    <TetheringUI
      tetheringEnabled={tetheringEnabled}
      onToggleTethering={setTetheringEnabled}
      disconnectedDevice={disconnectedDevice}
      disconnectDevice={disconnectDevice}
    />
  )
}

export default Tethering
