import { updateLocationSettings } from "Renderer/requests/app-settings.request"
import { useEffect, useState } from "react"
import { LocationPath } from "Renderer/components/core/location/location.enum"

const useLocationPicker = (
  locationToUpdate: LocationPath,
  onSuccessCallback?: () => void
) => {
  const [successState, setSuccessState] = useState()
  const openDialog = async () => {
    const success = await updateLocationSettings(locationToUpdate)
    setSuccessState(success)
  }
  useEffect(() => {
    if (successState) {
      onSuccessCallback?.()
    }
  }, [successState])
  return openDialog
}

export default useLocationPicker
