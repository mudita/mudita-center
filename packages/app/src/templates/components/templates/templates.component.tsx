/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState, useEffect } from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { TemplatesProps } from "App/templates/components/templates/templates.interface"
import { TemplatesSection } from "App/templates/components/templates/templates.styled"
import { TemplatesPanel } from "App/templates/components/templates-panel"
import { TemplatesList } from "App/templates/components/templates-list"
import { TemplateForm } from "App/templates/components/template-form"
import { Template, NewTemplate } from "App/templates/dto"
import { TemplateError } from "App/templates/constants"
import DeleteConfirmationModal from "App/templates/components/delete-confirmation-modal/delete-confirmation-modal.component"
import { defineMessages } from "react-intl"
import { intl, textFormatters } from "App/__deprecated__/renderer/utils/intl"
import InfoPopup from "App/ui/components/info-popup/info-popup.component"
import { Message as TranslationMessage } from "App/__deprecated__/renderer/interfaces/message.interface"
import ErrorModal from "App/ui/components/error-modal/error-modal.component"
import DeletingModal from "App/ui/components/deleting-modal/deleting-modal.component"
import { TemplatesTestIds } from "App/templates/components/templates/templates-test-ids.enum"
import useTableSelect from "App/__deprecated__/renderer/utils/hooks/useTableSelect"

const messages = defineMessages({
  deleteModalTitle: { id: "module.templates.deleteModalTitle" },
  deleteModalBody: { id: "module.templates.deleteModalBody" },
  templateDeleted: { id: "module.templates.templateDelete" },
  templatesDeleted: { id: "module.templates.templateDelete" },
  deletingModalTitle: { id: "module.templates.deletingModalTitle" },
  deletingModalSubtitle: { id: "module.templates.deletingModalSubtitle" },
  deleteModalErrorSubtitle: { id: "module.templates.deleteModalErrorSubtitle" },
})

export const Templates: FunctionComponent<TemplatesProps> = ({
  templates,
  loading,
  loaded,
  error,
  deleting,
  createTemplate,
  deleteTemplates,
  hideDeleteModal,
}) => {
  const [newTemplateOpen, setNewTemplateOpenState] = useState<boolean>(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const [deletedTemplates, setDeletedTemplates] = useState<string[]>([])
  const infoPopupDisplayTime = 5000

  const { selectedRows, allRowsSelected, toggleAll, resetRows, ...rest } =
    useTableSelect<Template>(templates)

  useEffect(() => {
    if (deleting && loaded) {
      const timeout = setTimeout(() => {
        setDeletedTemplates([])
        hideDeleteModal()
      }, infoPopupDisplayTime)
      return () => clearTimeout(timeout)
    }
    return
  }, [deleting, loaded])

  const getDeletedTemplateText = (
    deletedTemplatesLength: number
  ): TranslationMessage => {
    if (deletedTemplatesLength === 1) {
      return {
        ...messages.templateDeleted,
      }
    } else {
      return {
        ...messages.templatesDeleted,
        values: {
          number: deletedTemplatesLength,
        },
      }
    }
  }

  const handleOpenNewTemplateForm = () => {
    setNewTemplateOpenState(true)
  }
  const handleCloseNewTemplateForm = () => {
    setNewTemplateOpenState(false)
  }

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false)
    setDeletedTemplates([])
    resetRows()
  }
  const handleOpenDeleteModal = (ids: string[]) => {
    setDeleteModalOpen(true)
    setDeletedTemplates(ids)
  }
  const handleDeleteButton = async () => {
    handleCloseDeleteModal()
    await deleteTemplates(deletedTemplates)
  }
  const handleDeleteSelected = () => {
    const ids = selectedRows.map((thread) => thread.id)
    handleOpenDeleteModal(ids)
  }
  const handleSaveTemplate = async (template: NewTemplate) => {
    const data = await createTemplate(template)

    if (data.payload.type !== TemplateError.CreateTemplate) {
      setNewTemplateOpenState(false)
    }
  }

  return (
    <>
      <TemplatesPanel
        disabled={newTemplateOpen}
        onAddNewTemplate={handleOpenNewTemplateForm}
        selectedTemplates={selectedRows}
        allItemsSelected={allRowsSelected}
        toggleAll={toggleAll}
        onDeleteClick={handleDeleteSelected}
      />
      <TemplatesSection>
        <TemplatesList
          templates={templates}
          deleteTemplates={handleOpenDeleteModal}
          {...rest}
        />
        {newTemplateOpen && (
          <TemplateForm
            saving={loading}
            savingPossible={newTemplateOpen}
            error={error}
            onSave={handleSaveTemplate}
            onClose={handleCloseNewTemplateForm}
          />
        )}
      </TemplatesSection>
      <DeleteConfirmationModal
        testId={TemplatesTestIds.DeleteConfirmationModal}
        open={deleteModalOpen}
        info={{
          ...messages.deleteModalBody,
          values: { ...textFormatters, num: deletedTemplates.length },
        }}
        onActionButtonClick={handleDeleteButton}
        onCloseButton={handleCloseDeleteModal}
      />
      {deleting && loaded && (
        <InfoPopup message={getDeletedTemplateText(deletedTemplates.length)} />
      )}
      {deleting && loading && (
        <DeletingModal
          testId={TemplatesTestIds.DeletingTemplateModal}
          open={deleting && loading}
          title={intl.formatMessage(messages.deletingModalTitle)}
          subtitle={intl.formatMessage(messages.deletingModalSubtitle)}
        />
      )}
      {deleting && error !== null && (
        <ErrorModal
          testId={TemplatesTestIds.DeleteTemplateError}
          open={deleting && error !== null}
          title={intl.formatMessage(messages.deleteModalTitle)}
          subtitle={intl.formatMessage(messages.deleteModalErrorSubtitle)}
          closeModal={hideDeleteModal}
        />
      )}
    </>
  )
}
