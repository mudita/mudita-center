/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useState } from "react"
import styled from "styled-components"
import { backgroundColor } from "app-theme/utils"
import { QuotationsTopBar } from "./quotations-top-bar"

export const Quotations = () => {
  const [, setSettingsOpened] = useState(false)
  const [, setCreatorOpened] = useState(false)
  const [, setNoSpaceOpened] = useState(false)

  const quotations = []
  const selectedQuotations = []
  const isSpaceAvailable = () => true
  const [, setQuotationsDeleting] = useState(false)
  const [, setQuotationsDeletingCount] = useState(0)
  const [, setQuotationsDeleted] = useState(false)

  const handleSettingsClick = () => {
    setSettingsOpened(true)
  }

  const handleCreatorOpen = useCallback(() => {
    if (isSpaceAvailable()) {
      setCreatorOpened(true)
    } else {
      setNoSpaceOpened(true)
    }
  }, [isSpaceAvailable])

  const handleDeleteQuotation = useCallback(() => {
    setQuotationsDeletingCount(
      quotations.length > 0 && selectedQuotations.length === quotations.length
        ? -1
        : selectedQuotations.length
    )
    setQuotationsDeleted(false)
    setQuotationsDeleting(true)
  }, [quotations.length, selectedQuotations.length])

  const handleAllItemsToggle = () => {
    console.log("Toggle all items selection")
  }

  return (
    <Wrapper>
      <QuotationsTopBar
        onSettingsClick={handleSettingsClick}
        onAddClick={handleCreatorOpen}
        onDeleteClick={handleDeleteQuotation}
        onAllItemsToggle={handleAllItemsToggle}
        showAddButton={quotations.length > 0}
        selectedItemsNumber={selectedQuotations.length}
        allItemsSelected={selectedQuotations.length === quotations.length}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  background-color: ${backgroundColor("row")};
`
