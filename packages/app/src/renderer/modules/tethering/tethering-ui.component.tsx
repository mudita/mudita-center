/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { Dispatch, SetStateAction } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import TetheringEnabled from "Renderer/modules/tethering/screens/tethering-enabled.component"
import PureDisconnected from "Renderer/modules/tethering/screens/pure-disconnected.component"
import TetheringDisabled from "Renderer/modules/tethering/screens/tethering-disabled.component"

interface TetheringProps {
  pureFeaturesVisible?: boolean
  tetheringEnabled?: boolean
  onToggleTethering?: Dispatch<SetStateAction<boolean>>
}

const TetheringUI: FunctionComponent<TetheringProps> = ({
  pureFeaturesVisible,
  tetheringEnabled,
  onToggleTethering,
}) => (
  <>
    {!pureFeaturesVisible ? (
      <PureDisconnected />
    ) : tetheringEnabled ? (
      <TetheringEnabled
        tetheringEnabled={tetheringEnabled}
        onToggleTethering={onToggleTethering}
      />
    ) : (
      <TetheringDisabled
        tetheringEnabled={tetheringEnabled}
        onToggleTethering={onToggleTethering}
      />
    )}
  </>
)

export default TetheringUI
