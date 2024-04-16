/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
} from "react"
import { useLocation } from "react-router"

const RoutesHistoryContext = createContext<string[]>([])

export const RoutesHistoryProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const location = useLocation()
  const history = useRef<string[]>([])

  useEffect(() => {
    history.current = [location.pathname, ...history.current].slice(0, 10)
  }, [location])
  return (
    <RoutesHistoryContext.Provider value={history.current}>
      {children}
    </RoutesHistoryContext.Provider>
  )
}

export const useRoutesHistory = () => {
  return useContext(RoutesHistoryContext)
}

export const useFilteredRoutesHistory = (filters: string[]) => {
  const routes = useRoutesHistory()
  return routes.filter((route) => !filters.includes(route))
}
