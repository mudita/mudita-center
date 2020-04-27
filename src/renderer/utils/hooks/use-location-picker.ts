import { updateLocationSettings } from "Renderer/requests/app-settings.request"
import { useState } from "react"
import { LocationPath } from "Renderer/components/core/location/location.enum"

const useLocationPicker = (
  locationToUpdate: LocationPath,
  onSuccessCallback?: () => void
) => {
  const [successState, setState] = useState()
  const openDialog = async () => {
    const success = await updateLocationSettings(locationToUpdate)
    setState(success)
  }
  if (successState === true) {
    onSuccessCallback?.()
  }
  return openDialog
}

export default useLocationPicker
