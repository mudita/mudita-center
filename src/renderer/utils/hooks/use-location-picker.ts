import { updateLocationSettings } from "Renderer/requests/app-settings.request"
import { LocationPath } from "Renderer/components/core/location/location.enum"

const useLocationPicker = (
  locationToUpdate: LocationPath,
  onSuccessCallback?: () => void
) => {
  return async () => {
    if (await updateLocationSettings(locationToUpdate)) {
      onSuccessCallback?.()
    }
  }
}

export default useLocationPicker
