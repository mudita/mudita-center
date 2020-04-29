import FunctionComponent from "Renderer/types/function-component.interface"
import React from "react"
import { LocationPath } from "Renderer/components/core/location/location.enum"
import ButtonComponent from "Renderer/components/core/button/button.component"
import useLocationPicker from "Renderer/utils/hooks/use-location-picker"

interface Props {
  locationToUpdate: LocationPath
  buttonLabel: string
  onSuccess?: () => void
}

const Location: FunctionComponent<Props> = ({
  locationToUpdate,
  buttonLabel,
  onSuccess,
}) => {
  const openDialog = useLocationPicker(locationToUpdate, onSuccess)
  return <ButtonComponent onClick={openDialog} label={buttonLabel} />
}

export default Location
