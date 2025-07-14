/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useQuery } from "@tanstack/react-query"
import { settingsQueryKeys } from "./settings-query-keys"
import { AppSettings } from "./app-settings"

export const useSettings = () =>
  useQuery({
    queryKey: [settingsQueryKeys.all],
    queryFn: () => AppSettings.get(),
  })
