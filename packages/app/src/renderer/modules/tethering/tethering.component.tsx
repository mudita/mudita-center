/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import TetheringUI from "Renderer/modules/tethering/tethering-ui.component"

export interface TetheringProps {
  deviceUnlocked: boolean
}

const Tethering: FunctionComponent<TetheringProps> = ({ deviceUnlocked }) => {
  const [tetheringEnabled, setTetheringEnabled] = useState(false)
  return (
    <TetheringUI
      tetheringEnabled={tetheringEnabled}
      onToggleTethering={setTetheringEnabled}
      deviceUnlocked={deviceUnlocked}
    />
  )
}

export default Tethering
