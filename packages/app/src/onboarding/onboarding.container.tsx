/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { RootModel } from "App/__deprecated__/renderer/models/models"
import { TmpDispatch } from "App/__deprecated__/renderer/store"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { useHistory } from "react-router"
import { URL_MAIN, URL_ONBOARDING } from "App/__deprecated__/renderer/constants/urls"
import OnboardingWelcome from "App/onboarding/components/onboarding-welcome.component"
import React from "react"

const mapStateToProps = (state: RootModel) => {
  return state.settings
}

const mapDispatchToProps = (dispatch: TmpDispatch) => dispatch.settings

const Onboarding: FunctionComponent = () => {
  const history = useHistory()

  const onCancel = () => {
    // TODO: do some logic to start connecting to the phone, add error handling
    history.push(URL_MAIN.news)
  }

  const onTroubleshooting = () => {
    history.push(URL_ONBOARDING.troubleshooting)
  }

  return (
    <OnboardingWelcome
      onCancel={onCancel}
      onTroubleshooting={onTroubleshooting}
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding)
