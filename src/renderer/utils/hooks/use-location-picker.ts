import { updateLocationSettings } from "Renderer/requests/app-settings.request"
import { useState } from "react"

const useLocationPicker = async (locationToUpdate: any) => {
  const [state, setState] = useState()
  const openDialog = async () => {
    const { success } = await updateLocationSettings(locationToUpdate)
    setState(success)
  }
  return [state, openDialog]
}

export default useLocationPicker
