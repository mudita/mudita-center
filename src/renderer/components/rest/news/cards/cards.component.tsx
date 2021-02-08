/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import * as React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Card from "Renderer/components/rest/news/card/card.component"
import styled from "styled-components"
import { useEffect } from "react"
import { noop } from "Renderer/utils/noop"
import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"

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
