/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Cards from "Core/news/components/cards/cards.component"
import { NewsProps } from "Core/news/components/news/news.interface"
import { FunctionComponent } from "Core/__deprecated__/renderer/types/function-component.interface"
import React from "react"
import styled from "styled-components"
import { useGenericStoreDemo } from "generic-view/store"

const MuditaNews = styled.section`
  overflow: auto;
  padding: 3.5rem 3rem 0 3.2rem;
`

const News: FunctionComponent<NewsProps> = ({ newsItems, loadData }) => {
  // TODO: Demo purpose only, remove in future
  useGenericStoreDemo()
  return (
    <MuditaNews>
      <Cards newsItems={newsItems} loadData={loadData} />
    </MuditaNews>
  )
}

export default News
