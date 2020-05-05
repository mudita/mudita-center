import { Dispatch } from "Renderer/store"
import useLocationPicker from "Renderer/utils/hooks/use-location-picker"
import { LocationPath } from "Renderer/components/core/location/location.enum"

export default {
  state: {},
  effects: (dispatch: Dispatch) => ({
    async openDialog() {
      const openDialog = useLocationPicker(LocationPath.PureOsBackup)
      await openDialog()
    },
  }),
}
