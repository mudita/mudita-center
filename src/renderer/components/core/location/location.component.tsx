import FunctionComponent from "Renderer/types/function-component.interface"
import React from "react"
import { updateAppSettings } from "Renderer/requests/app-settings.request"
import { AppSettings } from "App/main/default-app-settings"

interface Props {
  currentLocation: Partial<AppSettings>
}

enum LocationPath {
  PureOsBackup,
  PureOsDownload,
}

const Location: FunctionComponent<Props> = ({ children, currentLocation }) => {
  return (
    <>
      {React.cloneElement(children as React.ReactElement, {
        onClick: async () => updateAppSettings(currentLocation),
      })}
    </>
  )
}

export default Location
