import React, { Dispatch, SetStateAction } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import TetheringEnabled from "Renderer/modules/tethering/screens/tethering-enabled.component"
import DevModeWrapper from "Renderer/components/rest/dev-mode-wrapper/dev-mode-wrapper.container"
import Button from "Renderer/components/core/button/button.component"
import PureDisconnected from "Renderer/modules/tethering/screens/pure-disconnected.component"
import TetheringDisabled from "Renderer/modules/tethering/screens/tethering-disabled.component"
import { TetheringWrapper } from "Renderer/modules/tethering/screens/tethering.styled"

interface TetheringProps {
  disconnectedDevice?: boolean
  test?: boolean // in order to test this without applying redux
  tetheringEnabled?: boolean
  onToggleTethering?: Dispatch<SetStateAction<boolean>>
  disconnectDevice?: () => void
}

const TetheringUI: FunctionComponent<TetheringProps> = ({
  disconnectedDevice,
  test,
  tetheringEnabled,
  onToggleTethering,
  disconnectDevice,
}) => {
  const getTetheringScreen = () => {
    switch (true) {
      case tetheringEnabled && !disconnectedDevice:
        return (
          <TetheringEnabled
            tetheringEnabled={tetheringEnabled}
            onToggleTethering={onToggleTethering}
          />
        )
      case !tetheringEnabled && !disconnectedDevice:
        return (
          <TetheringDisabled
            tetheringEnabled={tetheringEnabled}
            onToggleTethering={onToggleTethering}
          />
        )
      default:
        return <PureDisconnected />
    }
  }
  return (
    <>
      {!test && (
        <DevModeWrapper>
          <Button onClick={disconnectDevice} label="Disconnect device" />
        </DevModeWrapper>
      )}
      <TetheringWrapper>{getTetheringScreen()}</TetheringWrapper>
    </>
  )
}

export default TetheringUI
