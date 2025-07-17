/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react"
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
import { LoadingState } from "Core/__deprecated__/renderer/components/core/table/table.component"
import { deviceDataSelector } from "Core/device/selectors/device-data.selector"
import { Quotation } from "./store/types"
import {
  selectQuotations,
  selectQuotationsLoading,
  selectQuotationsSettings,
  selectSelectedQuotations,
} from "./store/selectors"
import {
  addQuotation,
  deleteQuotations,
  fetchQuotations,
  fetchQuotationsSettings,
  toggleAllQuotationsSelection,
  toggleQuotationSelection,
} from "./store/actions"
import { QuotationsCreator } from "./components/quotations-creator"
import { QuotationSavingModal } from "./components/quotation-saving-modal"
import { saveQuotationRequest } from "./service/requests"
import { QuotationDeletingModal } from "./components/quotation-deleting-modal"
import { NotEnoughSpaceModal } from "Core/quotations/components/not-enough-space-modal"

export const QuotationsPage: FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>()
  const deviceData = useSelector(deviceDataSelector)

  const [settingsOpened, setSettingsOpened] = useState(false)
  const [settingsSaved, setSettingsSaved] = useState(false)
  const [creatorOpened, setCreatorOpened] = useState(false)
  const [quotationSaving, setQuotationSaving] = useState(false)
  const [quotationSaved, setQuotationSaved] = useState(false)
  const [quotationsDeleting, setQuotationsDeleting] = useState(false)
  const [quotationsDeleted, setQuotationsDeleted] = useState(false)
  const [quotationsDeletingCount, setQuotationsDeletingCount] =
    useState<number>()
  const [noSpaceOpened, setNoSpaceOpened] = useState(true)

  const deviceInfo = useSelector(deviceDataSelector)
  const quotations = useSelector(selectQuotations)
  const selectedQuotations = useSelector(selectSelectedQuotations)
  const quotationsSettings = useSelector(selectQuotationsSettings)
  const quotationsLoading = useSelector(selectQuotationsLoading)

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

  const handleDeleteQuotation = useCallback(() => {
    setQuotationsDeletingCount(
      quotations.length > 0 && selectedQuotations.length === quotations.length
        ? -1
        : selectedQuotations.length
    )
    setQuotationsDeleted(false)
    setQuotationsDeleting(true)
  }, [quotations.length, selectedQuotations.length])

  const handleQuotationsDeletingClose = () => {
    setQuotationsDeleting(false)
  }

  const handleQuotationsDeletingConfirm = useCallback(async () => {
    await dispatch(deleteQuotations(selectedQuotations))
    handleQuotationsDeletingClose()
    setQuotationsDeleted(true)
  }, [dispatch, selectedQuotations])

  const handleCreatorClose = () => {
    setCreatorOpened(false)
  }

  const isSpaceAvailable = useCallback(() => {
    if (!deviceInfo?.memorySpace) {
      return true
    }
    const { reservedSpace, usedUserSpace, total } = deviceInfo.memorySpace
    return total - (reservedSpace + usedUserSpace) >= 500 // at least 500 bytes available
  }, [deviceInfo?.memorySpace])

  const handleCreatorOpen = useCallback(() => {
    if (isSpaceAvailable()) {
      setCreatorOpened(true)
    } else {
      setNoSpaceOpened(true)
    }
  }, [isSpaceAvailable])

  const handleNotEnoughSpaceModalClose = () => {
    setNoSpaceOpened(false)
  }

  const handleCreatorSave = async (quotation: string, author?: string) => {
    handleSavingModalOpen()
    handleCreatorClose()

    const response = await saveQuotationRequest(quotation, author)
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (response.ok) {
      dispatch(
        addQuotation({
          id: response.data.quoteId,
          text: quotation,
          author,
        })
      )
      setQuotationSaved(true)
    }

    handleSavingModalClose()
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

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null

    if (quotationsDeleted) {
      timeoutId = setTimeout(() => {
        setQuotationsDeleted(false)
        setQuotationsDeletingCount(undefined)
      }, 3000)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [quotationsDeleted])

  useEffect(() => {
    if (quotationsLoading !== undefined || !deviceData?.serialNumber) return
    dispatch(fetchQuotations({ serialNumber: deviceData.serialNumber }))
  }, [dispatch, quotationsLoading, deviceData?.serialNumber])

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
      {quotationsLoading ? (
        <LoadingState />
      ) : quotations.length === 0 ? (
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
      <QuotationDeletingModal
        opened={quotationsDeleting}
        count={quotationsDeletingCount}
        onConfirm={handleQuotationsDeletingConfirm}
        onCancel={handleQuotationsDeletingClose}
      />
      {quotationsDeleted && (
        <InfoPopup
          message={{
            id: "module.quotations.quotationsDeletingModal.deleteSuccess",
            values: { value: quotationsDeletingCount },
          }}
          icon={IconType.CheckCircleBlack}
        />
      )}
      <NotEnoughSpaceModal
        opened={noSpaceOpened}
        onCancel={handleNotEnoughSpaceModalClose}
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
