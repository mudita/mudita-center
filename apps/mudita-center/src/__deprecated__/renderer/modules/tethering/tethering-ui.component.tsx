/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { Dispatch, SetStateAction } from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import TetheringEnabled from "App/__deprecated__/renderer/modules/tethering/screens/tethering-enabled.component"
import PureDisconnected from "App/__deprecated__/renderer/modules/tethering/screens/pure-disconnected.component"
import TetheringDisabled from "App/__deprecated__/renderer/modules/tethering/screens/tethering-disabled.component"

interface TetheringProps {
  deviceUnlocked?: boolean
  tetheringEnabled?: boolean
  onToggleTethering?: Dispatch<SetStateAction<boolean>>
}

const TetheringUI: FunctionComponent<TetheringProps> = ({
  deviceUnlocked,
  tetheringEnabled,
  onToggleTethering,
}) => (
  <>
    {!deviceUnlocked ? (
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
