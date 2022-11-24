/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PhoneUpdate } from "App/__deprecated__/renderer/models/phone-update/phone-update.interface"
import { createModel } from "@rematch/core"
import { RootModel } from "App/__deprecated__/renderer/models/models"

// TODO [mw] get rid of me (move it's logic to update-os reducer) - scope of the next PR
const initialState: PhoneUpdate = {
  pureOsFileUrl: "",
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
