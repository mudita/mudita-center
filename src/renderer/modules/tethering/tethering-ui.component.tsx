import React, { Dispatch, SetStateAction } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import TetheringEnabled from "Renderer/modules/tethering/screens/tethering-enabled.component"
import DevModeWrapper from "Renderer/components/rest/dev-mode-wrapper/dev-mode-wrapper.container"
import Button from "Renderer/components/core/button/button.component"
import PureDisconnected from "Renderer/modules/tethering/screens/pure-disconnected.component"
import TetheringDisabled from "Renderer/modules/tethering/screens/tethering-disabled.component"
import { TetheringWrapper } from "Renderer/modules/tethering/screens/tethering.styled"
import StatBoxes from "Renderer/components/rest/tethering/stat-boxes.component"

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
      <TetheringWrapper>{getTetheringScreen()}</TetheringWrapper>
      {tetheringEnabled && (
        <StatBoxes
          timeActive={"15:03"}
          dataReceived={23943294}
          dataSent={92349324}
        />
      )}
    </>
  )
}

export default TetheringUI
