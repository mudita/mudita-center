import React, { ChangeEvent } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import TemplatesPanel from "Renderer/components/rest/messages/templates/templates-panel.component"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import TemplatesList from "Renderer/components/rest/messages/templates/templates-list.component"
import {
  Sidebar,
  TableWithSidebarWrapper,
} from "Renderer/components/core/table/table.component"
import useTableSidebar from "Renderer/utils/hooks/useTableSidebar"
import styled from "styled-components"
import { useTextEditor } from "Renderer/components/core/text-editor/text-editor.hook"
import TextEditor from "Renderer/components/core/text-editor/text-editor.component"
import { defineMessages } from "react-intl"
import { intl, textFormatters } from "Renderer/utils/intl"
import { noop } from "Renderer/utils/noop"
import { TemplateCallback } from "Renderer/models/templates/templates"
import { makeNewTemplate } from "Renderer/models/templates/templates"
import modalService from "Renderer/components/core/modal/modal.service"
import DeleteTemplateModal from "Renderer/modules/messages/tabs/delete-template-modal.component"
import { TemplatesTestIds } from "Renderer/modules/messages/tabs/templates.enum"

const messages = defineMessages({
  charactersNumber: { id: "view.name.messages.templates.charactersNumber" },
  title: { id: "view.name.messages.templatesDeleteModal.title" },
  many: { id: "view.name.messages.templatesDeleteModal.many" },
  single: { id: "view.name.messages.templatesDeleteModal.single" },
})

const TemplatesSidebar = styled(Sidebar)`
  --header-height: 5.6rem;
  margin-top: 4.7rem;
`

export interface Template {
  date: Date
  content: string
  id: string
}

export interface TemplatesProps {
  templatesList: Template[]
  onSearchTermChange?: (event: ChangeEvent<HTMLInputElement>) => void
  removeTemplates?: (ids: string[]) => void
  createNewTemplate?: (input: TemplateCallback) => void
  saveTemplate?: (input: Template) => void
  newTemplateId?: string
}

const Templates: FunctionComponent<TemplatesProps> = ({
  onSearchTermChange = noop,
  templatesList = [],
  removeTemplates,
  createNewTemplate,
  saveTemplate,
  newTemplateId,
}) => {
  const {
    selectedRows,
    allRowsSelected,
    toggleAll,
    resetRows,
    ...rest
  } = useTableSelect<Template>(templatesList)

  const sidebarHook = useTableSidebar<Template>()
  const { closeSidebar, activeRow, openSidebar } = sidebarHook

  const { rejectChanges, ...textEditorHook } = useTextEditor(activeRow)
  const {
    temporaryText: { length: textLength },
  } = textEditorHook

  const onNewButtonClick = () => {
    if (createNewTemplate) {
      createNewTemplate(openSidebar)
    }
  }

  const tryToSave = async () => {
    if (saveTemplate && activeRow) {
      const content = textEditorHook.temporaryText
      const { id } = activeRow

      saveTemplate(makeNewTemplate(id, content))
    }
  }

  const handleChangesReject = () => {
    rejectChanges()
    if (removeTemplates && newTemplateId && activeRow?.id === newTemplateId) {
      removeTemplates([newTemplateId])
      closeSidebar()
    }
  }

  const deleteTemplates = async (collection: string[]) => {
    if (removeTemplates) {
      removeTemplates(collection)
      resetRows()
      await modalService.closeModal()
    }
  }

  const onClose = () => {
    resetRows()
  }

  const modalConfig = (
    deleteFn: (ids?: string[]) => void | Promise<void>,
    single: boolean = selectedRows.length === 1
  ) => ({
    onClose,
    onDelete: deleteFn,
    title: intl.formatMessage(messages.title),
    messageCount: selectedRows.length,
    text: intl.formatMessage(single ? messages.single : messages.many, {
      num: selectedRows.length,
      ...textFormatters,
    }),
  })

  const openModalForMany = async () => {
    const deleteMany = () => deleteTemplates(selectedRows.map(({ id }) => id))

    await modalService.openModal(
      <DeleteTemplateModal {...modalConfig(deleteMany)} />
    )
  }

  const openModalForSingle = async (id: string) => {
    const deleteSingle = () => deleteTemplates([id])

    await modalService.openModal(
      <DeleteTemplateModal {...modalConfig(deleteSingle, true)} />
    )
  }

  return (
    <>
      <TemplatesPanel
        onDeleteButtonClick={openModalForMany}
        onNewButtonClick={onNewButtonClick}
        onSearchTermChange={onSearchTermChange}
        selectedItemsCount={selectedRows.length}
        allItemsSelected={allRowsSelected}
        toggleAll={toggleAll}
        newButtonDisabled={Boolean(newTemplateId)}
      />
      <TableWithSidebarWrapper>
        <TemplatesList
          templates={templatesList}
          deleteTemplate={openModalForSingle}
          newTemplateId={newTemplateId}
          {...sidebarHook}
          {...rest}
        />
        <TemplatesSidebar
          show={Boolean(activeRow)}
          onClose={closeSidebar}
          data-testid={TemplatesTestIds.TextEditor}
        >
          {activeRow && (
            <TextEditor
              {...textEditorHook}
              onChangesReject={handleChangesReject}
              onChangesSave={tryToSave}
              autoFocus={newTemplateId === activeRow?.id}
              statsInfo={intl.formatMessage(messages.charactersNumber, {
                charactersCount: textLength,
                smsCount: Math.ceil(textLength / 160),
              })}
            />
          )}
        </TemplatesSidebar>
      </TableWithSidebarWrapper>
    </>
  )
}

export default Templates
