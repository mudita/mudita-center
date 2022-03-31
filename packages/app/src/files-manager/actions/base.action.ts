/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { FilesManagerEvent } from "App/files-manager/constants"
import { McUsbFile } from "@mudita/pure"

export const setFiles = createAction<McUsbFile[]>(FilesManagerEvent.SetFiles)
