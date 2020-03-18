import { PhoneUpdate } from "Renderer/models/phone-update/phone-update.interface"

const initialState: PhoneUpdate = {
  pureOsFileName: "",
  pureOsAvailable: false,
  pureOsDownloaded: false,
}

export default {
  state: initialState,
  reducers: {
    update(state: Readonly<PhoneUpdate>, payload: PhoneUpdate) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
