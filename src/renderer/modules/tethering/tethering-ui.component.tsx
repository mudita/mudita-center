import React, { Dispatch, SetStateAction } from "react"
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
  tetheringEnabled?: boolean
  onToggleTethering?: Dispatch<SetStateAction<boolean>>
}

const TetheringUI: FunctionComponent<TetheringProps> = ({
  disconnectedDevice,
  test,
  tetheringEnabled,
  onToggleTethering,
}) => {
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
            onToggleTethering={onToggleTethering}
          />
        )}
        {disconnectedDevice && <PureDisconnected />}
      </TetheringWrapper>
    </>
  )
}

export default TetheringUI
