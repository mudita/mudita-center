import { updateLocationSettings } from "Renderer/requests/app-settings.request"
import { LocationPath } from "Renderer/modules/settings/tabs/backup/location-path.enum"
import { AppSettings } from "App/main/default-app-settings"

const useLocationPicker = (
  locationToUpdate: LocationPath,
  onSuccessCallback?: (
    location:
      | AppSettings["pureOsBackupLocation"]
      | AppSettings["pureOsDownloadLocation"]
  ) => void
) => {
  return async () => {
    const location = await updateLocationSettings(locationToUpdate)
    if (location && onSuccessCallback) {
      await onSuccessCallback(location)
    }
  }
}

export default useLocationPicker
