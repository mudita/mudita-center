/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { noop } from "Renderer/utils/noop"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Cards from "App/news/components/cards/cards.component"
import { NewsProps } from "App/news/components/news/news.interface"

const MuditaNews = styled.section`
  overflow: auto;
  padding: 3.2rem 3rem 0 4rem;
`

const News: FunctionComponent<NewsProps> = ({ newsItems, loadData = noop }) => {
  return (
    <MuditaNews>
      <Cards newsItems={newsItems} loadData={loadData} />
    </MuditaNews>
  )
}

export default News
