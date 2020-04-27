import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"
import { noop } from "Renderer/utils/noop"
import Cards from "Renderer/components/rest/news/cards/cards.component"
import { updateNews } from "Renderer/requests/get-news.request"
import { DefaultNewsItems } from "App/main/default-news-item"
import ProductCards from "Renderer/components/rest/news/product-cards/product-cards.component"
import styled from "styled-components"

interface Props {
  newsItems: NewsEntry[]
  loadData?: () => void
  updateData?: (news: DefaultNewsItems) => void
  productCards: any[]
}

const MuditaNews = styled.section`
  overflow: auto;
  padding-left: 4rem;
  padding-right: 3rem;
`

const News: FunctionComponent<Props> = ({
  newsItems,
  loadData = noop,
  updateData = noop,
  productCards,
}) => {
  // TODO: Function beneath and button are placeholder. Implement correct update process in different task
  const handleNewsUpdate = async () => {
    const updatedNews = await updateNews()
    updateData(updatedNews)
  }
  return (
    <MuditaNews>
      <Cards newsItems={newsItems} loadData={loadData} />
      {/*<button onClick={handleNewsUpdate}>Update</button>*/}
      <ProductCards productCards={productCards} />
    </MuditaNews>
  )
}

export default News
