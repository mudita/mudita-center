import FunctionComponent from "Renderer/types/function-component.interface"
import React, { useState } from "react"
import { updateLocationSettings } from "Renderer/requests/app-settings.request"
import { LocationPath } from "Renderer/components/core/location/location.enum"
import ButtonComponent from "Renderer/components/core/button/button.component"
import useLocationPicker from "Renderer/utils/hooks/use-location-picker"

interface Props {
  locationToUpdate: LocationPath
  buttonLabel: string
}

const Location: FunctionComponent<Props> = ({
  locationToUpdate,
  buttonLabel,
}) => {
  const { state, openDialog } = useLocationPicker(locationToUpdate)
  return <ButtonComponent onClick={openDialog} label={buttonLabel} />
}

export default Location
