/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import Card from "App/__deprecated__/news/components/card/card.component"
import styled from "styled-components"
import { useEffect } from "react"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { NewsEntry } from "App/__deprecated__/news/store/mudita-news.interface"

interface Props {
  newsItems: NewsEntry[]
  loadData?: () => void
}

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 4rem;
`

const Cards: FunctionComponent<Props> = ({ newsItems, loadData = noop }) => {
  useEffect(() => {
    loadData()
  }, [])
  return (
    <CardContainer>
      {newsItems.map((newsItem) => {
        return (
          <Card
            {...newsItem}
            key={newsItem.newsId}
            url={newsItem.link}
            count={newsItem.commentsCount}
          />
        )
      })}
    </CardContainer>
  )
}

export default Cards
