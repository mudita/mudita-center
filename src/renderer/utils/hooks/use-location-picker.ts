import { updateLocationSettings } from "Renderer/requests/app-settings.request"
import { LocationPath } from "Renderer/modules/settings/tabs/backup/location-path.enum"

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
