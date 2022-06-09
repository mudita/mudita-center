/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { TemplatesEvent } from "App/templates/constants"

export const hideDeleteModal = createAction(TemplatesEvent.HideDeleteModal)
