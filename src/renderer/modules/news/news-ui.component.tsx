/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"
import { noop } from "Renderer/utils/noop"
import Cards from "Renderer/components/rest/news/cards/cards.component"
import { updateNews } from "Renderer/requests/get-news.request"
import { DefaultNewsItems } from "App/main/default-news-item"
import ProductCards from "Renderer/components/rest/news/product-cards/product-cards.component"
import styled from "styled-components"
import UpdateButtonComponent from "Renderer/components/rest/news/update-button/update-button.component"
import LastUpdate from "Renderer/components/rest/news/last-update/last-update.component"

export interface NewsProps {
  newsItems: NewsEntry[]
  loadData?: () => void
  updateData?: (news: DefaultNewsItems | { updating: boolean }) => void
  lastUpdate?: string
  updating?: boolean
  online?: boolean
  productCards: any[]
}

const MuditaNews = styled.section`
  overflow: auto;
  padding-left: 4rem;
  padding-right: 3rem;
`

const LastUpdateWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1.6rem 0;
`

const NewsLastUpdate = styled(LastUpdate)`
  margin-right: 3.2rem;
`

const NewsProductCards = styled(ProductCards)`
  margin-top: 5.6rem;
  margin-bottom: 5.5rem;
`

const News: FunctionComponent<NewsProps> = ({
  newsItems,
  loadData = noop,
  updateData = noop,
  lastUpdate,
  productCards,
  updating,
  online,
}) => {
  const getUpdatedNews = async () => {
    updateData({ updating: true })
    const updatedNews = await updateNews()
    if (updatedNews !== null) {
      await updateData(updatedNews)
      updateData({ updating: false })
    }
    updateData({ updating: false })
  }
  return (
    <MuditaNews>
      <LastUpdateWrapper>
        <NewsLastUpdate date={lastUpdate} online={online} />
        <UpdateButtonComponent onClick={getUpdatedNews} updating={updating} />
      </LastUpdateWrapper>
      <Cards newsItems={newsItems} loadData={loadData} />
      <NewsProductCards productCards={productCards} />
    </MuditaNews>
  )
}

export default News
