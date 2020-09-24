import React, { useState, ChangeEvent } from "react"
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
import { createTemplate } from "Renderer/models/templates/templates"
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
  border-top: none;
`

export interface Template {
  date: Date
  content: string
  id: string
}

export interface TemplatesProps {
  templates: Template[]
  onNewButtonClick?: () => void
  onSearchTermChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onDeleteButtonClick: (ids: string[]) => void
  newTemplate?: (input: TemplateCallback) => void
  saveTemplate?: (input: Template) => void
}

const Templates: FunctionComponent<TemplatesProps> = ({
  onSearchTermChange = noop,
  templates = [],
  onDeleteButtonClick,
  newTemplate,
  saveTemplate,
}) => {
  const [newTemplateCreated, setNewTemplateCreated] = useState(false)
  const {
    selectedRows,
    allRowsSelected,
    toggleAll,
    resetRows,
    ...rest
  } = useTableSelect<Template>(templates)

  const sidebarHook = useTableSidebar<Template>()
  const { closeSidebar: baseCloseSidebar, activeRow, openSidebar } = sidebarHook

  const textEditorHook = useTextEditor(activeRow)
  const {
    temporaryText: { length: textLength },
  } = textEditorHook

  const onNewButtonClick = () => {
    if (newTemplate) {
      newTemplate(openSidebar)
      setNewTemplateCreated(true)
    }
  }

  const closeSidebar = () => {
    baseCloseSidebar()
    setNewTemplateCreated(false)
  }

  const tryToSave = async () => {
    if (saveTemplate && activeRow) {
      const content = textEditorHook.temporaryText
      const { id } = activeRow

      saveTemplate(createTemplate(id, content))
    }
  }

  const onDelete = async (collection: string[]) => {
    onDeleteButtonClick(collection)
    resetRows()
    await modalService.closeModal()
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
    const deleteMany = () => onDelete(selectedRows.map(({ id }) => id))

    await modalService.openModal(
      <DeleteTemplateModal {...modalConfig(deleteMany)} />
    )
  }

  const openModalForSingle = async (id: string) => {
    const deleteSingle = () => onDelete([id])

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
      />
      <TableWithSidebarWrapper>
        <TemplatesList
          templates={templates}
          deleteTemplate={openModalForSingle}
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
              saveChanges={tryToSave}
              autoFocus={newTemplateCreated}
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
