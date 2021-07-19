/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import OnboardingWelcome from "Renderer/components/rest/onboarding/onboarding-welcome.component"
import { useHistory } from "react-router"
import { URL_ONBOARDING } from "Renderer/constants/urls"
import { AppSettings } from "App/main/store/settings.interface"
import { connect } from "react-redux"
import { RootModel } from "Renderer/models/models"
import { FunctionComponent } from "Renderer/types/function-component.interface"

const mapStateToProps = (state: RootModel) => {
  return state.settings
}

const mapDispatchToProps = (dispatch: any) => dispatch.settings

interface Props {
  setCollectingData: (option: AppSettings["appCollectingData"]) => void
  appCollectingData: boolean | undefined
}

const Welcome: FunctionComponent<Props> = () => {
  const history = useHistory()

  const onContinue = () => {
    // TODO: do some logic to start connecting to the phone, add error handling
    history.push(URL_ONBOARDING.connecting)
  }

  const onTroubleshooting = () => {
    // TODO: do some logic to start connecting to the phone, add error handling
    history.push(URL_ONBOARDING.troubleshooting)
  }

  return (
    <>
      <OnboardingWelcome
        onContinue={onContinue}
        onTroubleshooting={onTroubleshooting}
      />
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
