/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FunctionComponent,
  PropsWithChildren,
  useLayoutEffect,
  useRef,
} from "react"
import { HistoryContext, historyContext } from "./history-context"
import { useLocation } from "react-router"
import { NewsPaths } from "news/models"

export const HistoryProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const paths = useRef<string[]>([])
  const { pathname } = useLocation()

  const getPreviousPath: HistoryContext["getPreviousPath"] = (filter) => {
    const path = filter
      ? paths.current.filter(filter).reverse()[0]
      : paths.current.reverse()[1]
    return path === "/" ? NewsPaths.Index : path || NewsPaths.Index
  }

  useLayoutEffect(() => {
    if (paths.current.length > 100) {
      paths.current.shift()
    }
    paths.current.push(pathname)
  }, [pathname])

  return (
    <historyContext.Provider value={{ paths: paths.current, getPreviousPath }}>
      {children}
    </historyContext.Provider>
  )
}
