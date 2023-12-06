/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState, useEffect } from "react"
import { FunctionComponent } from "Core/__deprecated__/renderer/types/function-component.interface"
import {
  TemplatesProps,
  TemplateServiceState,
} from "Core/templates/components/templates/templates.interface"
import { TemplatesSection } from "Core/templates/components/templates/templates.styled"
import { TemplatesPanel } from "Core/templates/components/templates-panel"
import { TemplatesList } from "Core/templates/components/templates-list"
import { TemplateForm } from "Core/templates/components/template-form"
import { Template, NewTemplate } from "Core/templates/dto"
import { TemplateError } from "Core/templates/constants"
import { useLoadingState } from "Core/ui"
import { DeletingTemplateModals } from "Core/templates/components/deleting-template-modals"
import { UpdatingTemplateModals } from "Core/templates/components/updating-template-modals"
import { CreatingTemplateModals } from "Core/templates/components/creating-template-modals"
import { OrderingTemplateModals } from "Core/templates/components/ordering-template-modals"

export const Templates: FunctionComponent<TemplatesProps> = ({
  templates,
  loading,
  loaded,
  error,
  createTemplate,
  deleteTemplates,
  updateTemplate,
  resetAllItems,
  selectAllItems,
  selectedItems,
  allItemsSelected,
}) => {
  const { states, updateFieldState, resetState } =
    useLoadingState<TemplateServiceState>({
      creating: false,
      creatingInfo: false,
      updating: false,
      updatingInfo: false,
      deleting: false,
      deletingConfirmation: false,
      deletingInfo: false,
      updatingOrder: false,
      updatingOrderInfo: false,
    })

  const [editedTemplate, setEditedTemplate] = useState<Template | undefined>()
  const [templateFormOpen, setTemplateFormOpenState] = useState<boolean>(false)
  const [deletedTemplates, setDeletedTemplates] = useState<string[]>([])

  const panelButtonDisabled =
    templateFormOpen || states.creating || states.updating

  useEffect(() => {
    if (!loaded || error) {
      return
    }

    const firstTimeout = setTimeout(() => {
      if (states.deleting) {
        updateFieldState("deleting", false)
        updateFieldState("deletingConfirmation", false)
        updateFieldState("deletingInfo", true)
      }

      if (states.updating) {
        updateFieldState("updating", false)
        updateFieldState("updatingInfo", true)
      }

      if (states.creating) {
        updateFieldState("creating", false)
        updateFieldState("creatingInfo", true)
      }

      if (states.updatingOrder) {
        updateFieldState("updatingOrder", false)
        updateFieldState("updatingOrderInfo", true)
      }
    }, 1000)

    const secondTimeout = setTimeout(() => {
      resetState(["deletingConfirmation"])
    }, 5000)
    return () => {
      clearTimeout(firstTimeout)
      clearTimeout(secondTimeout)
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, error])

  // Deleting functionality
  const handleCloseDeleteModal = () => {
    updateFieldState("deletingConfirmation", false)
    setDeletedTemplates([])
    resetAllItems()
  }

  const handleOpenDeleteModal = (ids: string[]) => {
    updateFieldState("deletingConfirmation", true)
    setDeletedTemplates(ids)
  }

  const handleDeleteButton = async () => {
    updateFieldState("deleting", true)
    updateFieldState("deletingConfirmation", false)
    resetAllItems()
    await deleteTemplates(deletedTemplates)
  }

  const handleDeleteSelected = () => {
    handleOpenDeleteModal(selectedItems)
  }

  const handleCloseDeletingErrorModal = () => {
    updateFieldState("deleting", false)
    setDeletedTemplates([])
    resetAllItems()
  }

  // Updating functionality
  const handleOpenUpdateTemplate = (id: string) => {
    const template = templates.find((template) => template.id === id)
    setEditedTemplate(template)
    setTemplateFormOpenState(true)
    resetAllItems()
  }

  const handleUpdateTemplate = async (template: NewTemplate) => {
    if (!editedTemplate) {
      return
    }

    updateFieldState("updating", true)
    setTemplateFormOpenState(false)

    const data = await updateTemplate({
      ...template,
      id: editedTemplate.id,
      lastUsedAt: editedTemplate.lastUsedAt,
      order: editedTemplate.order,
    })

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (data.payload.type !== TemplateError.UpdateTemplate) {
      setEditedTemplate(undefined)
    }
  }

  const handleCloseUpdatingErrorModal = () => {
    updateFieldState("updating", false)
  }

  // Creating functionality
  const handleOpenNewTemplateForm = () => {
    setTemplateFormOpenState(true)
  }

  const handleCloseNewTemplateForm = () => {
    setTemplateFormOpenState(false)
    setEditedTemplate(undefined)
  }

  const handleCreateTemplate = async (template: NewTemplate) => {
    updateFieldState("creating", true)
    setTemplateFormOpenState(false)
    await createTemplate(template)
  }

  const handleCloseCreatingErrorModal = () => {
    updateFieldState("creating", false)
  }

  const handleTemplateReorderedAction = () => {
    updateFieldState("updatingOrder", true)
  }

  return (
    <>
      <TemplatesPanel
        disabled={panelButtonDisabled}
        onAddNewTemplate={handleOpenNewTemplateForm}
        selectedTemplates={selectedItems}
        allItemsSelected={allItemsSelected}
        toggleAll={selectAllItems}
        resetRows={resetAllItems}
        onDeleteClick={handleDeleteSelected}
      />
      <TemplatesSection>
        <TemplatesList
          deleteTemplates={handleOpenDeleteModal}
          updateTemplate={handleOpenUpdateTemplate}
          templateReordered={handleTemplateReorderedAction}
          templateFormOpen={templateFormOpen}
          activeTemplate={editedTemplate}
          selectedTemplateIds={selectedItems}
        />
        {templateFormOpen && (
          <TemplateForm
            template={editedTemplate}
            saving={loading}
            error={error}
            onSave={
              editedTemplate ? handleUpdateTemplate : handleCreateTemplate
            }
            onClose={handleCloseNewTemplateForm}
          />
        )}
      </TemplatesSection>

      <DeletingTemplateModals
        error={error}
        deletedTemplatesLength={deletedTemplates.length}
        deleting={states.deleting}
        deletingInfo={states.deletingInfo}
        deletingConfirmation={states.deletingConfirmation}
        onCloseDeletingErrorModal={handleCloseDeletingErrorModal}
        onCloseDeletingModal={handleCloseDeleteModal}
        onDelete={handleDeleteButton}
      />

      <UpdatingTemplateModals
        error={error}
        updating={states.updating}
        updatingInfo={states.updatingInfo}
        onCloseUpdatingErrorModal={handleCloseUpdatingErrorModal}
      />

      <CreatingTemplateModals
        error={error}
        creating={states.creating}
        creatingInfo={states.creatingInfo}
        onCloseCreatingErrorModal={handleCloseCreatingErrorModal}
      />

      <OrderingTemplateModals
        error={error}
        updating={states.updatingOrder}
        updated={states.updatingOrderInfo}
      />
    </>
  )
}
