/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useState } from "react"
import styled from "styled-components"
import { backgroundColor } from "app-theme/utils"
import { LoadingState } from "app-theme/ui"
import { QuotationsTopBar } from "./quotations-top-bar"
import { quotationsMessages } from "./quotations.messages"
import { QuotationsEmptyState } from "./quotations-empty-state"
import { QuotationsList } from "./quotations-list"
import { Quotation } from "./quotations.types"

export const Quotations = () => {
  const [, setSettingsOpened] = useState(false)
  const [, setCreatorOpened] = useState(false)
  const [, setNoSpaceOpened] = useState(false)

  const quotations: Quotation[] = []
  const selectedQuotations: Quotation["id"][] = []
  const isSpaceAvailable = () => true
  const [, setQuotationsDeleting] = useState(false)
  const [, setQuotationsDeletingCount] = useState(0)
  const [, setQuotationsDeleted] = useState(false)

  const quotationsLoading = false

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

  const handleCheckboxToggle = (id: Quotation["id"]) => {
    console.log("Toggle item with id:", id)
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
      {quotationsLoading ? (
        <QuotationsLoadingState
          opened={true}
          message={quotationsMessages.loadStateText.id}
        />
      ) : quotations.length === 0 ? (
        <QuotationsEmptyState onAddClick={handleCreatorOpen} />
      ) : (
        <QuotationsList
          quotations={quotations}
          onCheckboxToggle={handleCheckboxToggle}
          selectedQuotations={selectedQuotations}
        />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  background-color: ${backgroundColor("row")};
  height: 100%;
`

const QuotationsLoadingState = styled(LoadingState)`
  margin-top: -12rem;
`
