/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import Card from "App/news/components/card/card.component"
import styled from "styled-components"
import { useEffect } from "react"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { NewsEntry } from "App/news/dto"

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
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
