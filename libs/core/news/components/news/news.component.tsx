/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import Cards from "Core/news/components/cards/cards.component"
import { NewsProps } from "Core/news/components/news/news.interface"
import { FunctionComponent } from "Core/core/types/function-component.interface"

const MuditaNews = styled.section`
  overflow: auto;
  padding: 3.5rem 3rem 0 3.2rem;
`

const News: FunctionComponent<NewsProps> = ({ newsItems, loadData }) => {
  return (
    <MuditaNews>
      <Cards newsItems={newsItems} loadData={loadData} />
    </MuditaNews>
  )
}

export default News
