/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"
import { noop } from "Renderer/utils/noop"
import Cards from "Renderer/components/rest/news/cards/cards.component"
import styled from "styled-components"
// import PasscodeModal from "App/passcod-modal/passcode-modal.component"
export interface NewsProps {
  newsItems: NewsEntry[]
  loadData?: () => void
}

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
