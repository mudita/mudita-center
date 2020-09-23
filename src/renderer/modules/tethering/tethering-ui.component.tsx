import React, { useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { TetheringWrapper } from "Renderer/modules/tethering/screens/pure-disconnected.styled"
import TetheringEnabled from "Renderer/modules/tethering/screens/tethering-enabled.component"
import DevModeWrapper from "Renderer/components/rest/dev-mode-wrapper/dev-mode-wrapper.container"
import Button from "Renderer/components/core/button/button.component"
import PureDisconnected from "Renderer/modules/tethering/screens/pure-disconnected.component"
import TetheringDisabled from "Renderer/modules/tethering/screens/tethering-disabled.component"

interface TetheringProps {
  enabled?: boolean
  disconnectedDevice?: boolean
  test?: boolean // in order to test this without applying redux
}

const TetheringUI: FunctionComponent<TetheringProps> = ({
  disconnectedDevice,
  enabled,
  test,
}) => {
  const [tetheringEnabled, toggleTetheringEnabled] = useState(enabled || false)
  const _devToggleTethering = () => toggleTetheringEnabled((state) => !state)

  return (
    <>
      {!test && (
        <DevModeWrapper>
          <Button onClick={_devToggleTethering} label="Toggle tethering" />
        </DevModeWrapper>
      )}
      <TetheringWrapper>
        {tetheringEnabled && !disconnectedDevice && <TetheringEnabled />}
        {!tetheringEnabled && !disconnectedDevice && <TetheringDisabled />}
        {disconnectedDevice && <PureDisconnected />}
      </TetheringWrapper>
    </>
  )
}

export default TetheringUI
