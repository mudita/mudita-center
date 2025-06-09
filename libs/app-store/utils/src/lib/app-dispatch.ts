/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDispatch } from "react-redux"
import { AppDispatch } from "app-store/models"

export const useAppDispatch = useDispatch as () => AppDispatch
