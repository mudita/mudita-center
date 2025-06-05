/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useContext } from "react"
import { historyContext } from "./history-context"

export const useRoutingHistory = () => useContext(historyContext)
