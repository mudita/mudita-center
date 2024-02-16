/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { setBackupFiles } from "./actions"

export interface Backup {
  fileName: string
  date: Date
  features: string[]
  device: {
    serialNumber: string
    vendorId: string
    productId: string
    osVersion: string
  }
}

interface BackupState {
  files: Backup[]
}

const initialState: BackupState = {
  files: [
    {
      fileName: "backup1.json",
      date: new Date(),
      features: ["calls", "messages"],
      device: {
        serialNumber: "0123456789ABCDEF",
        vendorId: "0e8d",
        productId: "2006",
        osVersion: "12",
      },
    },
  ],
}

export const genericBackupsReducer = createReducer(initialState, (builder) => {
  builder.addCase(setBackupFiles, (state, action) => {
    state.files = action.payload
  })
})
