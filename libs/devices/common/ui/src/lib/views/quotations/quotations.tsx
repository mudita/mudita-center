/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useState } from "react"
import styled from "styled-components"
import { backgroundColor } from "app-theme/utils"
import {
  GenericDeleteFlow,
  GenericDeleteFlowProps,
  GenericDeleteItem,
  LoadingState,
} from "app-theme/ui"
import { QuotationsTopBar } from "./quotations-top-bar"
import { quotationsMessages } from "./quotations.messages"
import { QuotationsEmptyState } from "./quotations-empty-state"
import { QuotationsList } from "./quotations-list"
import { Quotation } from "./quotations.types"
import {
  QuotationsCreateFlow,
  QuotationsCreateFlowProps,
} from "./quotations-create-flow/quotations-create-flow"

interface QuotationsProps
  extends Pick<QuotationsCreateFlowProps, "createQuotation"> {
  quotations: Quotation[]
  isLoading?: boolean
  onDeleteSuccess?: GenericDeleteFlowProps["onDeleteSuccess"]
  deleteQuotation: GenericDeleteFlowProps["deleteItem"]
  messages: GenericDeleteFlowProps["deleteFlowMessages"]
}

export const Quotations: FunctionComponent<QuotationsProps> = ({
  quotations,
  isLoading = false,
  createQuotation,
  deleteQuotation,
  onDeleteSuccess,
  messages,
}) => {
  const [, setSettingsOpened] = useState(false)
  const [createFlowOpened, setCreateFlowOpened] = useState(false)
  const [, setNoSpaceOpened] = useState(false)

  const [selectedQuotations, setSelectedQuotations] = useState<Quotation[]>([])
  const isSpaceAvailable = () => true
  const [deleteFlowOpened, setDeleteFlowOpened] = useState(false)

  const handleSettingsClick = () => {
    setSettingsOpened(true)
  }

  const handleCreatorOpen = useCallback(() => {
    if (isSpaceAvailable()) {
      setCreateFlowOpened(true)
    } else {
      setNoSpaceOpened(true)
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
        <QuotationsEmptyState onAddClick={handleCreatorOpen} />
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
