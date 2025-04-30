/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "types-preload"
import { FunctionComponent, useEffect } from "react"
import { News } from "news/ui"
import { useDispatch, useSelector } from "react-redux"
import { selectNews } from "../store/news.selectors"
import { setNews } from "../store/news.actions"

export const NewsPage: FunctionComponent = () => {
  const dispatch = useDispatch()
  const news = useSelector(selectNews)

  useEffect(() => {
    void (async () => {
      const newsData = await window.api.news.get()
      dispatch(setNews(newsData))
    })()
  }, [dispatch])

  useEffect(() => {
    void (async () => {
      window.api.news.onRefreshed((data) => {
        dispatch(setNews(data))
      })
    })()
  }, [dispatch])

  return <News newsItems={news} />
}
