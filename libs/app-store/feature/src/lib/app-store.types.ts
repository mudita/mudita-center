/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppStore, StoreInstance } from "./app-store"

export type RootState = ReturnType<AppStore>
export type AppDispatch = StoreInstance["dispatch"]
