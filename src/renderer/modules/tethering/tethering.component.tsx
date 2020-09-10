import React, { useState } from "react"

import { FunctionComponent } from "Renderer/types/function-component.interface"
import { TetheringWrapper } from "Renderer/modules/tethering/screens/disabled.styled"

import TetheringEnabled from "Renderer/modules/tethering/screens/enabled.component"
import TetheringDisabled from "Renderer/modules/tethering/screens/disabled.component"
import DevModeWrapper from "Renderer/components/rest/dev-mode-wrapper/dev-mode-wrapper.container"
import Button from "Renderer/components/core/button/button.component"

interface TetheringProps {
  enabled?: boolean
}

const Tethering: FunctionComponent<TetheringProps> = ({ enabled }) => {
  const [tetheringEnabled, toggleTetheringEnabled] = useState(enabled || false)
  const _devToggleTethering = () => toggleTetheringEnabled((state) => !state)

  return (
    <>
      <DevModeWrapper>
        <Button onClick={_devToggleTethering} label="Toggle tethering" />
      </DevModeWrapper>
      <TetheringWrapper>
        {tetheringEnabled ? <TetheringEnabled /> : <TetheringDisabled />}
      </TetheringWrapper>
    </>
  )
}

export default Tethering
