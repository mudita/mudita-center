/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { newsQueryKeys } from "./news-query-keys"
import { useEffect } from "react"

export const useNews = () => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: newsQueryKeys.all,
    queryFn: () => {
      return window.api.news.get()
    },
    select: (data) => {
      return data.items
    },
  })

  useEffect(() => {
    window.api.news.onRefreshed((data) => {
      queryClient.setQueryData(newsQueryKeys.all, data)
    })
  }, [queryClient])

  return query
}
