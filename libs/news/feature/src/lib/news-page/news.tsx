/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// eslint-disable-next-line @nx/enforce-module-boundaries
import "../../../../../../apps/app/src/preload/api.d"
import { FunctionComponent, useLayoutEffect } from "react"
import { News } from "news/ui"
import { useDispatch, useSelector } from "react-redux"
import { selectNews } from "../news.selectors"
import { setNews } from "../news.actions"

export const NewsPage: FunctionComponent = () => {
  const dispatch = useDispatch()
  const news = useSelector(selectNews)

  useLayoutEffect(() => {
    if (!news.length) {
      void (async () => {
        const newsItems = await window.api.news.get()
        dispatch(setNews(newsItems))

        window.api.news.onRefreshed((data) => {
          dispatch(setNews(data))
        })
      })()
    }
  }, [dispatch, news.length])

  return <News newsItems={news} />
}
