/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useEffect, useState } from "react"
import styled from "styled-components"
import { TopBar } from "./components/top-bar"
import { SettingsModal } from "./components/settings-modal"
import { EmptyState } from "./components/empty-state"
import { List } from "./components/list"
import { backgroundColor } from "Core/core/styles/theming/theme-getters"
import { useDispatch, useSelector } from "react-redux"
import InfoPopup from "Core/ui/components/info-popup/info-popup.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { AppPortal } from "Root/libs/generic-view/ui/src/lib/data-rows/app-portal"
import { AppDispatch } from "Core/__deprecated__/renderer/store"
import { Quotation } from "./store/types"
import {
  selectQuotations,
  selectQuotationsSettings,
  selectSelectedQuotations,
} from "./store/selectors"
import {
  deleteQuotations,
  fetchQuotationsSettings,
  toggleAllQuotationsSelection,
  toggleQuotationSelection,
} from "./store/actions"
import { QuotationsCreator } from "./components/quotations-creator"
import { QuotationSavingModal } from "./components/quotation-saving-modal"

export const QuotationsPage: FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [settingsOpened, setSettingsOpened] = useState(false)
  const [creatorOpened, setCreatorOpened] = useState(false)
  const [quotationSaving, setQuotationSaving] = useState(false)
  const [quotationSaved, setQuotationSaved] = useState(false)

  const quotations = useSelector(selectQuotations)
  const selectedQuotations = useSelector(selectSelectedQuotations)
  const quotationsSettings = useSelector(selectQuotationsSettings)
  const [settingsSaved, setSettingsSaved] = useState(false)

  const handleSettingsClick = () => {
    setSettingsOpened(true)
  }

  const handleSettingsClose = (saved?: boolean) => {
    setSettingsOpened(false)
    if (saved) {
      setSettingsSaved(true)
    }
  }

  const handleCheckboxToggle = (id: Quotation["id"]) => {
    dispatch(toggleQuotationSelection(id))
  }

  const handleAllItemsToggle = () => {
    dispatch(toggleAllQuotationsSelection())
  }

  const handleDeleteQuotation = () => {
    // TODO: Implement confirmation modal before deleting
    dispatch(deleteQuotations())
  }

  const handleCreatorClose = () => {
    setCreatorOpened(false)
  }

  const handleCreatorOpen = () => {
    setCreatorOpened(true)
  }

  const handleCreatorSave = async () => {
    handleSavingModalOpen()
    handleCreatorClose()

    // TODO: Implement saving to Harmony
    await new Promise((resolve) => setTimeout(resolve, 2000))

    handleSavingModalClose()
    setQuotationSaved(true)
  }

  const handleSavingModalClose = () => {
    setQuotationSaving(false)
  }

  const handleSavingModalOpen = () => {
    setQuotationSaving(true)
  }

  useEffect(() => {
    if (!quotationsSettings.source || !quotationsSettings.interval) {
      dispatch(fetchQuotationsSettings())
    }
  }, [dispatch, quotationsSettings.interval, quotationsSettings.source])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null

    if (settingsSaved) {
      timeoutId = setTimeout(() => {
        setSettingsSaved(false)
      }, 3000)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [settingsSaved])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null

    if (quotationSaved) {
      timeoutId = setTimeout(() => {
        setQuotationSaved(false)
      }, 3000)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [quotationSaved])

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
        onAddClick={handleCreatorOpen}
        onDeleteClick={handleDeleteQuotation}
        onAllItemsToggle={handleAllItemsToggle}
        showAddButton={quotations.length > 0}
        selectedItemsNumber={selectedQuotations.length}
        allItemsSelected={selectedQuotations.length === quotations.length}
      />
      <SettingsModal open={settingsOpened} handleClose={handleSettingsClose} />
      {quotations.length === 0 ? (
        <EmptyState onAddClick={handleCreatorOpen} />
      ) : (
        <List
          quotations={quotations}
          onCheckboxToggle={handleCheckboxToggle}
          selectedQuotations={selectedQuotations}
        />
      )}
      {settingsSaved && (
        <InfoPopup
          message={{ id: "module.quotations.settingsModal.saveSuccess" }}
          icon={IconType.CheckCircleBlack}
        />
      )}
      <QuotationsCreator
        opened={creatorOpened}
        onClose={handleCreatorClose}
        onSave={handleCreatorSave}
      />
      <QuotationSavingModal opened={quotationSaving} />
      {quotationSaved && (
        <InfoPopup
          message={{ id: "module.quotations.creatorModal.saveSuccess" }}
          icon={IconType.CheckCircleBlack}
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
