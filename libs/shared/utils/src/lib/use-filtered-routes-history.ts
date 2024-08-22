/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useRoutesHistory } from "./routes-history.context"

export const useFilteredRoutesHistory = (
  filters: string[],
  cutoffRoute?: string
) => {
  const routes = useRoutesHistory()
  const cutoffIndex = cutoffRoute ? routes.indexOf(cutoffRoute) : -1
  const endIndex = cutoffIndex !== -1 ? cutoffIndex + 1 : routes.length
  return routes.slice(0, endIndex).filter((route) => !filters.includes(route))
}
