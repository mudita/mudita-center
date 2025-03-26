/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useEffect } from "react"
import styled from "styled-components"
import Card from "../card/card.component"
import { NewsItem } from "news/models"

interface Props {
  newsItems: NewsItem[]
  loadData?: VoidFunction
}

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 4rem;
`

const Cards: FunctionComponent<Props> = ({ newsItems, loadData }) => {
  useEffect(() => {
    loadData?.()
  }, [loadData])
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
