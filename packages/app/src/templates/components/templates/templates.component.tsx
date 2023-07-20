/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState, useEffect } from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  TemplatesProps,
  TemplateServiceState,
} from "App/templates/components/templates/templates.interface"
import { TemplatesSection } from "App/templates/components/templates/templates.styled"
import { TemplatesPanel } from "App/templates/components/templates-panel"
import { TemplatesList } from "App/templates/components/templates-list"
import { TemplateForm } from "App/templates/components/template-form"
import { Template, NewTemplate } from "App/templates/dto"
import { TemplateError } from "App/templates/constants"
import { useLoadingState } from "App/ui"
import { DeletingTemplateModals } from "App/templates/components/deleting-template-modals"
import { UpdatingTemplateModals } from "App/templates/components/updating-template-modals"
import { CreatingTemplateModals } from "App/templates/components/creating-template-modals"
import { DropResult } from "react-beautiful-dnd"
import { reorder } from "App/templates/helpers/templates-order.helpers"
import { OrderingTemplateModals } from "App/templates/components/ordering-template-modals"
import { useDispatch, useSelector } from "react-redux"
import { ReduxRootState, TmpDispatch } from "App/__deprecated__/renderer/store"
import { templatesListSelector } from "App/templates/selectors"
import {
  createTemplate,
  deleteTemplates,
  updateTemplate,
  updateTemplateOrder,
  resetAllItems,
  selectAllItems,
} from "App/templates/actions"

export const Templates = () => {
  const {
    loading,
    loaded,
    error,
    selectedItems: { rows: selectedItems },
    data,
  } = useSelector((state: ReduxRootState) => state.templates)
  const allItemsSelected = data.length === selectAllItems.length
  const templates = useSelector(templatesListSelector)

  const dispatch = useDispatch<TmpDispatch>()

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
  const [templatesList, setTemplatesList] = useState<Template[]>(templates)
  const panelButtonDisabled =
    templateFormOpen || states.creating || states.updating

  useEffect(() => {
    if (!loading) {
      setTemplatesList(templates)
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templates])

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
    dispatch(resetAllItems())
  }

  const handleOpenDeleteModal = (ids: string[]) => {
    updateFieldState("deletingConfirmation", true)
    setDeletedTemplates(ids)
  }

  const handleDeleteButton = async () => {
    updateFieldState("deleting", true)
    updateFieldState("deletingConfirmation", false)
    dispatch(resetAllItems())
    await dispatch(deleteTemplates(deletedTemplates))
  }

  const handleDeleteSelected = () => {
    handleOpenDeleteModal(selectedItems)
  }

  const handleCloseDeletingErrorModal = () => {
    updateFieldState("deleting", false)
    setDeletedTemplates([])
    dispatch(resetAllItems())
  }

  // Updating functionality
  const handleOpenUpdateTemplate = (id: string) => {
    const template = templates.find((template) => template.id === id)
    setEditedTemplate(template)
    setTemplateFormOpenState(true)
    dispatch(resetAllItems())
  }

  const handleUpdateTemplate = async (template: NewTemplate) => {
    if (!editedTemplate) {
      return
    }

    updateFieldState("updating", true)
    setTemplateFormOpenState(false)

    const data = await dispatch(
      updateTemplate({
        ...template,
        id: editedTemplate.id,
        lastUsedAt: editedTemplate.lastUsedAt,
        order: editedTemplate.order,
      })
    )

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
    const lastTemplateOrder = templates[templates.length - 1]?.order
    const newTemplateOrder = lastTemplateOrder ? lastTemplateOrder + 1 : 1
    await dispatch(createTemplate({ ...template, order: newTemplateOrder }))
  }

  const handleCloseCreatingErrorModal = () => {
    updateFieldState("creating", false)
  }

  const onDragEnd = (result: DropResult) => {
    updateFieldState("updatingOrder", true)
    if (!result.destination) {
      return
    }

    const list = Array.from(templatesList)
    const [removed] = list.splice(result.source.index, 1)
    list.splice(result.destination.index, 0, removed)
    setTemplatesList(list)
    const updatedTemplates = reorder(list)
    void dispatch(updateTemplateOrder(updatedTemplates))
  }
  return (
    <>
      <TemplatesPanel
        disabled={panelButtonDisabled}
        onAddNewTemplate={handleOpenNewTemplateForm}
        selectedTemplates={selectedItems}
        allItemsSelected={allItemsSelected}
        toggleAll={selectAllItems}
        resetRows={() => dispatch(resetAllItems())}
        onDeleteClick={handleDeleteSelected}
      />
      <TemplatesSection>
        <TemplatesList
          templates={loading ? templatesList : templates}
          deleteTemplates={handleOpenDeleteModal}
          updateTemplate={handleOpenUpdateTemplate}
          onDragEnd={onDragEnd}
          templateFormOpen={templateFormOpen}
          active={editedTemplate}
          selectedItems={selectedItems}
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
