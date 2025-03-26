/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import Cards from "../cards/cards.component"
import { NewsItem } from "news/models"

const MuditaNews = styled.section`
  overflow: auto;
  padding: 3.5rem 3rem 0 3.2rem;
`

interface NewsProps {
  newsItems: NewsItem[]
}

export const News: FunctionComponent<NewsProps> = ({ newsItems }) => {
  return (
    <MuditaNews>
      <Cards newsItems={newsItems} />
    </MuditaNews>
  )
}
