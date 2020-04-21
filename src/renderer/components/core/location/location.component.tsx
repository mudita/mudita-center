import FunctionComponent from "Renderer/types/function-component.interface"
import React from "react"
import { updateLocationSettings } from "Renderer/requests/app-settings.request"
import { LocationPath } from "Renderer/components/core/location/location.enum"

interface Props {
  locationToUpdate: LocationPath
}

const Location: FunctionComponent<Props> = ({ children, locationToUpdate }) => {
  return (
    <>
      {React.cloneElement(children as React.ReactElement, {
        onClick: async () => updateLocationSettings(locationToUpdate),
      })}
    </>
  )
}

export default Location
