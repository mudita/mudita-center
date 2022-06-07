/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState, useEffect } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { TemplatesProps } from "App/templates/components/templates/templates.interface"
import { TemplatesSection } from "App/templates/components/templates/templates.styled"
import { TemplatesPanel } from "App/templates/components/templates-panel"
import { TemplatesList } from "App/templates/components/templates-list"
import { TemplateForm } from "App/templates/components/template-form"
import { NewTemplate } from "App/templates/dto"
import { TemplateError, TemplateDeletingState } from "App/templates/constants"
import DeleteConfirmationModal from "App/templates/components/delete-confirmation-modal/delete-confirmation-modal.component"
import { defineMessages } from "react-intl"
import { intl, textFormatters } from "Renderer/utils/intl"
import InfoPopup from "App/ui/components/info-popup/info-popup.component"
import { Message as TranslationMessage } from "Renderer/interfaces/message.interface"
import ErrorModal from "App/ui/components/error-modal/error-modal.component"
import DeletingModal from "App/ui/components/deleting-modal/deleting-modal.component"

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
  error,
  deletingState,
  createTemplate,
  deleteTemplates,
  hideDeleteModal,
}) => {
  const [newTemplateOpen, setNewTemplateOpenState] = useState<boolean>(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const [deletedTemplates, setDeletedTemplates] = useState<string[]>([])

  useEffect(() => {
    if (deletingState === TemplateDeletingState.Success) {
      const timeout = setTimeout(() => {
        setDeletedTemplates([])
        hideDeleteModal()
      }, 5000)
      return () => clearTimeout(timeout)
    }
    return
  }, [deletingState])

  const getMessageText = (number: number): TranslationMessage => {
    if (number === 1) {
      return {
        ...messages.templateDeleted,
      }
    } else {
      return {
        ...messages.templatesDeleted,
        values: {
          number: number,
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
  }
  const handleOpenDeleteModal = (ids: string[]) => {
    setDeleteModalOpen(true)
    setDeletedTemplates(ids)
  }
  const handleDeleteButton = () => {
    deleteTemplates(deletedTemplates)
    handleCloseDeleteModal()
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
      />
      <TemplatesSection>
        <TemplatesList
          templates={templates}
          deleteTemplates={handleOpenDeleteModal}
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
        open={deleteModalOpen}
        info={{
          ...messages.deleteModalBody,
          values: { ...textFormatters, num: deletedTemplates.length },
        }}
        onActionButtonClick={handleDeleteButton}
        onCloseButton={handleCloseDeleteModal}
      />
      {deletingState === TemplateDeletingState.Success && (
        <InfoPopup message={getMessageText(deletedTemplates.length)} />
      )}
      {deletingState === TemplateDeletingState.Deleting && (
        <DeletingModal
          open={deletingState === TemplateDeletingState.Deleting}
          title={intl.formatMessage(messages.deletingModalTitle)}
          subtitle={intl.formatMessage(messages.deletingModalSubtitle)}
        />
      )}
      {deletingState === TemplateDeletingState.Fail && (
        <ErrorModal
          open={deletingState === TemplateDeletingState.Fail}
          title={intl.formatMessage(messages.deleteModalTitle)}
          subtitle={intl.formatMessage(messages.deleteModalErrorSubtitle)}
          closeModal={hideDeleteModal}
        />
      )}
    </>
  )
}
