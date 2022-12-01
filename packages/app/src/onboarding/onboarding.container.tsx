/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import {
  TmpDispatch,
  ReduxRootState,
  RootState,
} from "App/__deprecated__/renderer/store"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { useHistory } from "react-router"
import {
  URL_MAIN,
  URL_ONBOARDING,
} from "App/__deprecated__/renderer/constants/urls"
import OnboardingWelcome from "App/onboarding/components/onboarding-welcome.component"
import React from "react"

const mapStateToProps = (state: ReduxRootState & RootState) => {
  return state.settings
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
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
