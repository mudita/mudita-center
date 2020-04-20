import React, { ChangeEvent, useEffect, useReducer, useState } from "react"

import FunctionComponent from "Renderer/types/function-component.interface"
import { Link } from "react-router-dom"
import { URL_ONBOARDING } from "Renderer/constants/urls"
import {
  getAppSettings,
  resetAppSettings,
  updateAppSettings,
} from "Renderer/requests/app-settings.request"
import InputCheckbox from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { AppSettings } from "App/main/default-app-settings"
import { InputText } from "Renderer/components/core/input-text/input-text.elements"
import Location from "Renderer/components/core/location/location.component"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"

// DO NOT REVIEW THIS CODE, IT'S FOR TESTING PURPOSES ONLY
const Backup: FunctionComponent = () => {
  const [settings, setSettings] = useState<AppSettings>()
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0)

  useEffect(() => {
    ;(async () => {
      setSettings(await getAppSettings())
    })()
  }, [ignored])

  const toggleAutostart = async (event: ChangeEvent<HTMLInputElement>) => {
    if (settings) {
      setSettings({ ...settings, appAutostart: event.target.checked })
    }
  }

  const changeBackupLocation = (event: ChangeEvent<HTMLInputElement>) => {
    if (settings) {
      setSettings({ ...settings, pureOsBackupLocation: event.target.value })
    }
  }

  const changeDownloadLocation = (event: ChangeEvent<HTMLInputElement>) => {
    if (settings) {
      setSettings({ ...settings, pureOsDownloadLocation: event.target.value })
    }
  }

  const save = async () => {
    if (settings) {
      await updateAppSettings(settings)
    }
  }

  const reset = async () => {
    await resetAppSettings()
    forceUpdate()
  }

  return (
    <div>
      Settings
      <br />
      <Link to={URL_ONBOARDING.root}>Go to onboarding</Link>
      <br />
      <hr />
      <br />
      {settings && (
        <div>
          <InputCheckbox
            label={"Autostart"}
            checked={settings?.appAutostart}
            onChange={toggleAutostart}
          />
          <br />
          <div>
            <InputText
              placeholder={"Pure OS backup location"}
              size={120}
              type={"text"}
              value={settings?.pureOsBackupLocation}
              onChange={changeBackupLocation}
            />
            <br />
            <InputText
              placeholder={"Pure OS download location"}
              size={120}
              type={"text"}
              value={settings?.pureOsDownloadLocation}
              onChange={changeDownloadLocation}
            />
            <br />
            <Location currentLocation={settings}>
              <ButtonComponent label={"Save"} />
            </Location>
            <br />
            <ButtonComponent
              label={"Reset"}
              displayStyle={DisplayStyle.Secondary}
              onClick={reset}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Backup
