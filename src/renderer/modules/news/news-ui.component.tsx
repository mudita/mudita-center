import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"
import { noop } from "Renderer/utils/noop"
import Cards from "Renderer/components/rest/news/cards/cards.component"
import { updateNews } from "Renderer/requests/get-news.request"
import { DefaultNewsItems } from "App/main/default-news-item"
import ProductCards from "Renderer/components/rest/news/product-cards/product-cards.component"
import styled from "styled-components"
import UpdateButtonComponent from "Renderer/components/rest/news/update-button/update-button.component"
import LastUpdate from "Renderer/components/rest/news/last-update/last-update.component"

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
      <LastUpdateWrapper>
        <NewsLastUpdate offline date="2019-10-18T11:27:15.256Z" />
        <UpdateButtonComponent />
      </LastUpdateWrapper>
      <Cards newsItems={newsItems} loadData={loadData} />
      {/*<button onClick={handleNewsUpdate}>Update</button>*/}
      <NewsProductCards productCards={productCards} />
    </MuditaNews>
  )
}

export default News
