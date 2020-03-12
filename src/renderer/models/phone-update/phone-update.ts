import { PhoneUpdate } from "Renderer/models/phone-update/phone-update.interface"

const initialState: PhoneUpdate = {
  pureOsFileName: "",
  pureOsAvailable: false,
  pureOsDownloaded: false,
}

export default {
  state: initialState,
  reducers: {
    update(
      state: Readonly<PhoneUpdate>,
      { pureOsFileName, pureOsAvailable, pureOsDownloaded }: PhoneUpdate
    ) {
      return {
        ...state,
        ...(pureOsFileName ? { pureOsFileName } : {}),
        ...(pureOsAvailable ? { pureOsAvailable } : {}),
        ...(pureOsDownloaded ? { pureOsDownloaded } : {}),
      }
    },
  },
}
