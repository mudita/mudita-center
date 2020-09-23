import React, { useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { TetheringWrapper } from "Renderer/modules/tethering/screens/pure-disconnected.styled"
import TetheringEnabled from "Renderer/modules/tethering/screens/tethering-enabled.component"
import DevModeWrapper from "Renderer/components/rest/dev-mode-wrapper/dev-mode-wrapper.container"
import Button from "Renderer/components/core/button/button.component"
import PureDisconnected from "Renderer/modules/tethering/screens/pure-disconnected.component"
import TetheringDisabled from "Renderer/modules/tethering/screens/tethering-disabled.component"
import { noop } from "Renderer/utils/noop"

interface TetheringProps {
  disconnectedDevice?: boolean
  test?: boolean // in order to test this without applying redux
}

const TetheringUI: FunctionComponent<TetheringProps> = ({
  disconnectedDevice,
  test,
}) => {
  const [tetheringEnabled, setTetheringEnabled] = useState(false)
  return (
    <>
      {!test && (
        <DevModeWrapper>
          <Button onClick={noop} label="Toggle tethering" />
        </DevModeWrapper>
      )}
      <TetheringWrapper>
        {tetheringEnabled && !disconnectedDevice && <TetheringEnabled />}
        {!tetheringEnabled && !disconnectedDevice && (
          <TetheringDisabled
            tetheringEnabled={tetheringEnabled}
            onToggleTethering={setTetheringEnabled}
          />
        )}
        {disconnectedDevice && <PureDisconnected />}
      </TetheringWrapper>
    </>
  )
}

export default TetheringUI
