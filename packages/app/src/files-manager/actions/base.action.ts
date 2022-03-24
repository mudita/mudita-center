/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { FilesManagerEvent } from "App/files-manager/constants"
import { MtpFile } from "App/files-manager/reducers"

export const setFiles = createAction<MtpFile[]>(FilesManagerEvent.SetFiles)
