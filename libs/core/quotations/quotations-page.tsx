/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useState } from "react"
import styled from "styled-components"
import { TopBar } from "./components/top-bar"
import { SettingsModal } from "./components/settings-modal"
import { EmptyState } from "./components/empty-state"
import { List, Quotation } from "Core/quotations/components/list"
import { backgroundColor } from "Core/core/styles/theming/theme-getters"

export const QuotationsPage: FunctionComponent = () => {
  const [selectedQuotations, setSelectedQuotations] = useState<
    Quotation["id"][]
  >([])
  const [settingsOpened, setSettingsOpened] = useState(false)
  const [quotations, setQuotations] = useState<Quotation[]>([])

  const handleSettingsClick = () => {
    setSettingsOpened(true)
  }

  const handleSettingsClose = () => {
    setSettingsOpened(false)
  }

  const handleCheckboxToggle = (id: Quotation["id"]) => {
    setSelectedQuotations((prevSelected) => {
      return prevSelected.includes(id)
        ? prevSelected.filter((quotationId) => quotationId !== id)
        : [...prevSelected, id]
    })
  }

  const handleAllItemsToggle = () => {
    if (selectedQuotations.length === quotations.length) {
      setSelectedQuotations([])
    } else {
      setSelectedQuotations(quotations.map((quotation) => quotation.id))
    }
  }

  const handleAddQuotation = () => {
    // TODO: Demo code, replace with final implementation
    setQuotations((prevQuotations) => [
      ...prevQuotations,
      {
        id: `quotation-${prevQuotations.length + 1}`,
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quotation ${
          prevQuotations.length + 1
        }`,
        author:
          Math.random() > 0.5 ? `Author ${prevQuotations.length + 1}` : "",
      },
    ])
  }

  const handleDeleteQuotation = () => {
    // TODO: Demo code, replace with final implementation
    setQuotations((prevQuotations) => {
      return prevQuotations.filter(
        (quotation) => !selectedQuotations.includes(quotation.id)
      )
    })
    setSelectedQuotations([])
  }

  return (
    <Wrapper>
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
