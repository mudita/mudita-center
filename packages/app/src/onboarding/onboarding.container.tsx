/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { RootModel } from "Renderer/models/models"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { useHistory } from "react-router"
import { URL_MAIN, URL_ONBOARDING } from "Renderer/constants/urls"
import OnboardingWelcome from "App/onboarding/components/onboarding-welcome.component"
import React from "react"
import { AppSettings } from "App/main/store/settings.interface"

const mapStateToProps = (state: RootModel) => {
  return state.settings
}

const mapDispatchToProps = (dispatch: any) => dispatch.settings

interface Props {
  setCollectingData: (option: AppSettings["appCollectingData"]) => void
  appCollectingData: boolean | undefined
}

const Onboarding: FunctionComponent<Props> = () => {
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
