import { PhoneUpdate } from "Renderer/models/phone-update/phone-update.interface"
import { createModel } from "@rematch/core"
import { RootModel } from "Renderer/models/models"

const initialState: PhoneUpdate = {
  pureOsFileName: "",
  pureOsAvailable: false,
  pureOsDownloaded: false,
}

const phoneUpdate = createModel<RootModel>({
  state: initialState,
  reducers: {
    update(state: Readonly<PhoneUpdate>, payload: PhoneUpdate) {
      return {
        ...state,
        ...payload,
      }
    },
  },
})

export default phoneUpdate
