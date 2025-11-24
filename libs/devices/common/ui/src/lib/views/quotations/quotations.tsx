/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useRef, useState } from "react"
import styled from "styled-components"
import { Quotation } from "devices/common/models"
import { backgroundColor } from "app-theme/utils"
import {
  GenericDeleteFlow,
  GenericDeleteFlowProps,
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
  deleteQuotations: GenericDeleteFlowProps["deleteItemsAction"]
  onDeleteSuccess?: (items: { id: string }[]) => Promise<void>
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
  deleteQuotations,
  createQuotation,
  onDeleteSuccess,
  messages,
}) => {
  const genericDeleteRef = useRef<GenericDeleteFlow>(null)

  const [settingsOpened, setSettingsOpened] = useState(false)
  const [createFlowOpened, setCreateFlowOpened] = useState(false)
  const [noSpaceModalOpened, setNoSpaceModalOpened] = useState(false)

  const [selectedQuotations, setSelectedQuotations] = useState<Quotation[]>([])

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
    genericDeleteRef.current?.deleteItems(
      selectedQuotations.map((item) => ({
        id: item.id,
        name: item.quote,
      }))
    )
  }, [selectedQuotations])

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

  const finalizeDeleteSuccess: NonNullable<
    GenericDeleteFlowProps["onDeleteSuccess"]
  > = useCallback(
    async ({ allItems, failedItems }) => {
      await onDeleteSuccess?.(allItems.map((item) => ({ id: item.id })))
      if (failedItems) {
        setSelectedQuotations((selected) =>
          selected.filter((quotation) =>
            failedItems.some((item) => item.id === quotation.id)
          )
        )
      } else {
        setSelectedQuotations([])
      }
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
        ref={genericDeleteRef}
        onDeleteSuccess={finalizeDeleteSuccess}
        deleteItemsAction={deleteQuotations}
        deleteFlowMessages={messages}
      />
      <GenericFailedModal
        opened={noSpaceModalOpened}
        onClose={() => setNoSpaceModalOpened(false)}
        title={formatMessage(messages.noSpaceModalTitle)}
        description={formatMessage(messages.noSpaceModalDescription)}
        closeButtonText={formatMessage(messages.noSpaceModalButtonText)}
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
