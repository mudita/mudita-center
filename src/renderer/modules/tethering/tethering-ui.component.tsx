import React, { Dispatch, SetStateAction } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import TetheringEnabled from "Renderer/modules/tethering/screens/tethering-enabled.component"
import DevModeWrapper from "Renderer/components/rest/dev-mode-wrapper/dev-mode-wrapper.container"
import Button from "Renderer/components/core/button/button.component"
import PureDisconnected from "Renderer/modules/tethering/screens/pure-disconnected.component"
import TetheringDisabled from "Renderer/modules/tethering/screens/tethering-disabled.component"

interface TetheringProps {
  disconnectedDevice?: boolean
  tetheringEnabled?: boolean
  onToggleTethering?: Dispatch<SetStateAction<boolean>>
  disconnectDevice?: () => void
}

const TetheringUI: FunctionComponent<TetheringProps> = ({
  disconnectedDevice,
  tetheringEnabled,
  onToggleTethering,
  disconnectDevice,
}) => {
  const getTetheringScreen = () => {
    if (disconnectedDevice) {
      return <PureDisconnected />
    }
    if (tetheringEnabled) {
      return (
        <TetheringEnabled
          tetheringEnabled={tetheringEnabled}
          onToggleTethering={onToggleTethering}
        />
      )
    }
    return (
      <TetheringDisabled
        tetheringEnabled={tetheringEnabled}
        onToggleTethering={onToggleTethering}
      />
    )
  }
  return (
    <>
      <DevModeWrapper>
        <Button onClick={disconnectDevice} label="Disconnect device" />
      </DevModeWrapper>
      {getTetheringScreen()}
    </>
  )
}

export default TetheringUI
