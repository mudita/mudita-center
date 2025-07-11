/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useState } from "react"
import styled from "styled-components"
import { TopBar } from "./components/top-bar"
import { SettingsModal } from "./components/settings-modal"
import { EmptyState } from "./components/empty-state"
import { List } from "Core/quotations/components/list"
import { backgroundColor } from "Core/core/styles/theming/theme-getters"
import { useDispatch, useSelector } from "react-redux"
import {
  selectQuotations,
  selectSelectedQuotations,
} from "Core/quotations/store/selectors"
import {
  addQuotation,
  deleteQuotations,
  toggleAllQuotationsSelection,
  toggleQuotationSelection,
} from "Core/quotations/store/actions"
import { AppDispatch } from "Core/__deprecated__/renderer/store"
import { Quotation } from "./store/types"
import { AppPortal } from "Root/libs/generic-view/ui/src/lib/data-rows/app-portal"

export const QuotationsPage: FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [settingsOpened, setSettingsOpened] = useState(false)

  const quotations = useSelector(selectQuotations)
  const selectedQuotations = useSelector(selectSelectedQuotations)

  const handleSettingsClick = () => {
    setSettingsOpened(true)
  }

  const handleSettingsClose = () => {
    setSettingsOpened(false)
  }

  const handleCheckboxToggle = (id: Quotation["id"]) => {
    dispatch(toggleQuotationSelection(id))
  }

  const handleAllItemsToggle = () => {
    dispatch(toggleAllQuotationsSelection())
  }

  const handleAddQuotation = () => {
    // TODO: Implement modal for adding a quotation

    // Demo code for testing purposes
    dispatch(
      addQuotation({
        id: `quotation-${crypto.randomUUID()}`,
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        author: Math.random() > 0.5 ? `Author` : "",
      })
    )
  }

  const handleDeleteQuotation = () => {
    // TODO: Implement confirmation modal before deleting
    dispatch(deleteQuotations())
  }

  return (
    <Wrapper>
      {quotations.length > 0 && (
        <AppPortal config={{ portal: "app-header" }}>
          {" "}
          ({quotations.length})
        </AppPortal>
      )}
      <TopBar
        onSettingsClick={handleSettingsClick}
        onAddClick={handleAddQuotation}
        onDeleteClick={handleDeleteQuotation}
        onAllItemsToggle={handleAllItemsToggle}
        showAddButton={quotations.length > 0}
        selectedItemsNumber={selectedQuotations.length}
        allItemsSelected={selectedQuotations.length === quotations.length}
      />
      <SettingsModal open={settingsOpened} handleClose={handleSettingsClose} />
      {quotations.length === 0 ? (
        <EmptyState onAddClick={handleAddQuotation} />
      ) : (
        <List
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
`
