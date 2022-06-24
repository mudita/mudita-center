/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import Cards from "App/__deprecated__/news/components/cards/cards.component"
import { NewsProps } from "App/__deprecated__/news/components/news/news.interface"

const MuditaNews = styled.section`
  overflow: auto;
  padding: 3.5rem 3rem 0 3.2rem;
`

const News: FunctionComponent<NewsProps> = ({ newsItems, loadData = noop }) => {
  return (
    <MuditaNews>
      <Cards newsItems={newsItems} loadData={loadData} />
    </MuditaNews>
  )
}

export default News
