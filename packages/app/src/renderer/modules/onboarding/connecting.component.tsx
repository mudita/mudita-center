/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { useHistory } from "react-router"
import { URL_MAIN, URL_ONBOARDING } from "Renderer/constants/urls"
import OnboardingConnecting from "Renderer/components/rest/onboarding/onboarding-connecting.component"
import { updateAppSettings } from "Renderer/requests/app-settings.request"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { RootState, select } from "Renderer/store"
import { connect } from "react-redux"

export const registerFirstPhoneConnection = async () => {
  updateAppSettings({ key: "pureNeverConnected", value: false })
}

const Connecting: FunctionComponent<{ pureFeaturesVisible: boolean }> = ({
  pureFeaturesVisible,
}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (pureFeaturesVisible) {
        history.push(URL_MAIN.overview)
      }
    }, 500)

    return () => clearTimeout(timeout)
  }, [pureFeaturesVisible])

  const history = useHistory()

  const onCancel = () => {
    // TODO: do some logic to connect to the phone, add cancelling logic
    // This redirect is only for testing purposes

    // TODO: on success call registerFirstPhoneConnection function
    history.push(URL_ONBOARDING.troubleshooting)
  }
  return <OnboardingConnecting onCancel={onCancel} />
}

const selection = select((models: any) => ({
  pureFeaturesVisible: models.basicInfo.pureFeaturesVisible,
}))

const mapStateToProps = (state: RootState) => {
  return {
    ...(selection(state, null) as { connected: boolean }),
  }
}

export default connect(mapStateToProps)(Connecting)
