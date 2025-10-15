/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useState } from "react"
import styled from "styled-components"
import { Quotation } from "devices/common/models"
import { backgroundColor } from "app-theme/utils"
import {
  GenericDeleteFlow,
  GenericDeleteFlowProps,
  GenericDeleteItem,
  GenericFailedModal,
  LoadingState,
} from "app-theme/ui"
import { QuotationsTopBar } from "./quotations-top-bar"
import { quotationsMessages } from "./quotations.messages"
import {
  QuotationsEmptyState,
  QuotationsEmptyStateProps,
} from "./quotations-empty-state"
import { QuotationsList } from "./quotations-list"
import {
  QuotationsCreateFlow,
  QuotationsCreateFlowProps,
} from "./quotations-create-flow/quotations-create-flow"
import {
  QuotationsSettingsFlow,
  QuotationsSettingsFlowProps,
} from "./quotations-settings-flow/quotations-settings-flow"
import { formatMessage, Messages } from "app-localize/utils"

interface QuotationsProps {
  quotations: Quotation[]
  isLoading: boolean
  isSpaceAvailable: boolean
  settings: QuotationsSettingsFlowProps["settings"]
  updateSettings: QuotationsSettingsFlowProps["updateSettings"]
  createQuotation: QuotationsCreateFlowProps["createQuotation"]
  deleteQuotation: GenericDeleteFlowProps["deleteItem"]
  onDeleteSuccess?: GenericDeleteFlowProps["onDeleteSuccess"]
  messages: QuotationsEmptyStateProps["messages"] &
    QuotationsCreateFlowProps["messages"] &
    QuotationsSettingsFlowProps["messages"] &
    GenericDeleteFlowProps["deleteFlowMessages"] & {
      noSpaceModalTitle: Messages
      noSpaceModalDescription: Messages
      noSpaceModalButtonText: Messages
    }
}

export const Quotations: FunctionComponent<QuotationsProps> = ({
  quotations,
  isLoading,
  isSpaceAvailable,
  settings,
  updateSettings,
  deleteQuotation,
  createQuotation,
  onDeleteSuccess,
  messages,
}) => {
  const [settingsOpened, setSettingsOpened] = useState(false)
  const [createFlowOpened, setCreateFlowOpened] = useState(false)
  const [noSpaceModalOpened, setNoSpaceModalOpened] = useState(false)

  const [selectedQuotations, setSelectedQuotations] = useState<Quotation[]>([])
  const [deleteFlowOpened, setDeleteFlowOpened] = useState(false)

  const handleSettingsClick = () => {
    setSettingsOpened(true)
  }

  const handleCreatorOpen = useCallback(() => {
    if (isSpaceAvailable) {
      setCreateFlowOpened(true)
    } else {
      setNoSpaceModalOpened(true)
    }
  }, [isSpaceAvailable])

  const startDeleteFlow = useCallback(() => {
    setDeleteFlowOpened(true)
  }, [])

  const handleAllItemsToggle = () => {
    if (selectedQuotations.length === quotations.length) {
      setSelectedQuotations([])
    } else {
      setSelectedQuotations(quotations)
    }
  }

  const handleCheckboxToggle = (id: Quotation["id"]) => {
    setSelectedQuotations((prevQuotations) => {
      if (prevQuotations.some((prevQuotation) => prevQuotation.id === id)) {
        return prevQuotations.filter((prevQuotation) => prevQuotation.id !== id)
      } else {
        const quotation = quotations.find((item) => item.id === id)
        return quotation ? [...prevQuotations, quotation] : prevQuotations
      }
    })
  }

  const handlePartialDeleteFailure = useCallback(
    async (failedFiles: GenericDeleteItem[]) => {
      if (failedFiles.length === selectedQuotations.length) {
        setDeleteFlowOpened(false)
      } else {
        setDeleteFlowOpened(false)
        const notFailedQuotations: { id: GenericDeleteItem["id"] }[] =
          selectedQuotations.filter(
            (quotation) => !failedFiles.find((file) => file.id === quotation.id)
          )
        onDeleteSuccess && (await onDeleteSuccess(notFailedQuotations))
        setSelectedQuotations(() => {
          const next: Quotation[] = []
          failedFiles.forEach((file) => {
            const quotation = quotations.find((item) => item.id === file.id)
            if (quotation) {
              next.push(quotation)
            }
          })
          return next
        })
      }
    },
    [onDeleteSuccess, quotations, selectedQuotations]
  )

  const finalizeDeleteSuccess = useCallback(
    async (items: { id: GenericDeleteItem["id"] }[]) => {
      onDeleteSuccess && (await onDeleteSuccess(items))
      setSelectedQuotations([])
      setDeleteFlowOpened(false)
    },
    [onDeleteSuccess]
  )

  return (
    <Wrapper>
      <QuotationsTopBar
        onSettingsClick={handleSettingsClick}
        onAddClick={handleCreatorOpen}
        onDeleteClick={startDeleteFlow}
        onAllItemsToggle={handleAllItemsToggle}
        showAddButton={quotations.length > 0}
        selectedItemsNumber={selectedQuotations.length}
        allItemsSelected={selectedQuotations.length === quotations.length}
      />
      {isLoading ? (
        <QuotationsLoadingState
          opened={true}
          message={quotationsMessages.loadStateText.id}
        />
      ) : quotations.length === 0 ? (
        <QuotationsEmptyState
          onAddClick={handleCreatorOpen}
          messages={messages}
        />
      ) : (
        <QuotationsList
          quotations={quotations}
          onCheckboxToggle={handleCheckboxToggle}
          selectedQuotations={selectedQuotations.map((item) => item.id)}
        />
      )}
      <QuotationsCreateFlow
        opened={createFlowOpened}
        onClose={() => setCreateFlowOpened(false)}
        createQuotation={createQuotation}
        messages={messages}
      />
      <GenericDeleteFlow
        opened={deleteFlowOpened}
        onClose={() => setDeleteFlowOpened(false)}
        selectedItems={selectedQuotations.map((item) => ({
          id: item.id,
          name: item.quote,
        }))}
        onDeleteSuccess={finalizeDeleteSuccess}
        onPartialDeleteFailure={handlePartialDeleteFailure}
        deleteItem={deleteQuotation}
        deleteFlowMessages={messages}
      />
      <GenericFailedModal
        opened={noSpaceModalOpened}
        onClose={() => setNoSpaceModalOpened(false)}
        title={formatMessage(messages.noSpaceModalTitle)}
        description={formatMessage(messages.noSpaceModalDescription)}
        buttonText={formatMessage(messages.noSpaceModalButtonText)}
      />
      <QuotationsSettingsFlow
        opened={settingsOpened}
        settings={settings}
        customQuotationsCount={quotations.length}
        updateSettings={updateSettings}
        onClose={() => setSettingsOpened(false)}
        messages={messages}
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
  height: 100%;
  width: 100%;
`

const QuotationsLoadingState = styled(LoadingState)`
  margin-top: -12rem;
`
