/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { useHistory } from "react-router"
import { URL_OVERVIEW } from "Renderer/constants/urls"
import ButtonComponent from "App/renderer/components/core/button/button.component"

const PureSystem: FunctionComponent = () => {
  const history = useHistory()
  const handleBack = () => {
    history.push(URL_OVERVIEW.root)
  }

  return (
    <div>
      Pure System
      <ButtonComponent
      onClick={handleBack}
      labelMessage={{
        id: "module.contacts.delete",
      }}
      />
    </div>
  )
}

export default PureSystem
