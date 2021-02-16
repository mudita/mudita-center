/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React, { useEffect, useState } from "react"
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
  setAutostart: (option: AppSettings["appAutostart"]) => void
  checkAutostartValue?: any
}

const Welcome: FunctionComponent<Props> = ({
  setAutostart,
  checkAutostartValue,
}) => {
  const history = useHistory()
  const [autostartStatus, setAutostartStatus] = useState<
    AppSettings["appAutostart"] | undefined
  >()

  const onContinue = () => {
    // TODO: do some logic to start connecting to the phone, add error handling
    history.push(URL_ONBOARDING.connecting)
  }

  const onAutostartChange = async (enabled?: boolean) => {
    setAutostart(Boolean(enabled))
  }

  useEffect(() => {
    ;(async () => {
      setAutostartStatus(await checkAutostartValue())
    })()
  }, [])

  return (
    <OnboardingWelcome
      onContinue={onContinue}
      onAutostartChange={onAutostartChange}
      autostartEnabled={autostartStatus}
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
