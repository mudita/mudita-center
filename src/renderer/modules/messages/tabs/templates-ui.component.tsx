import React, { useState, ChangeEvent } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
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
import { intl } from "Renderer/utils/intl"
import { noop } from "Renderer/utils/noop"
import { TemplateCallback } from "Renderer/models/templates/templates"
import { templateFactory } from "Renderer/models/templates/templates"

const messages = defineMessages({
  charactersNumber: { id: "view.name.messages.templates.charactersNumber" },
})

const TemplatesSidebar = styled(Sidebar)`
  --header-height: 5.6rem;
  border-top: none;
`

export interface Template {
  id: string
  content: string
}

export interface TemplatesProps {
  templates: Template[]
  onDeleteButtonClick?: () => void
  onNewButtonClick?: () => void
  onSearchTermChange?: (event: ChangeEvent<HTMLInputElement>) => void
  newTemplate: (input: TemplateCallback) => void
  saveTemplate?: (input: Template) => void
}

const Templates: FunctionComponent<TemplatesProps> = ({
  onDeleteButtonClick = noop,
  onSearchTermChange = noop,
  templates = [],
  newTemplate,
  saveTemplate,
}) => {
  const [newTemplateCreated, setNewTemplateCreated] = useState(false)
  const { selectedRows, allRowsSelected, toggleAll, ...rest } = useTableSelect<
    Template
  >(templates)

  const sidebarHook = useTableSidebar<Template>()
  const { closeSidebar: baseCloseSidebar, activeRow, openSidebar } = sidebarHook

  const textEditorHook = useTextEditor(activeRow)
  const {
    temporaryText: { length: textLength },
  } = textEditorHook

  const onNewButtonClick = () => {
    newTemplate(openSidebar)
    setNewTemplateCreated(true)
  }

  const closeSidebar = () => {
    baseCloseSidebar()
    setNewTemplateCreated(false)
  }

  const tryToSave = async () => {
    if (saveTemplate && activeRow) {
      const content = textEditorHook.temporaryText
      const { id } = activeRow

      saveTemplate(templateFactory(id, content))
    }
  }

  return (
    <>
      <TemplatesPanel
        onDeleteButtonClick={onDeleteButtonClick}
        onNewButtonClick={onNewButtonClick}
        onSearchTermChange={onSearchTermChange}
        selectedItemsCount={selectedRows.length}
        allItemsSelected={allRowsSelected}
        toggleAll={toggleAll}
      />
      <TableWithSidebarWrapper>
        <TemplatesList
          templates={templates}
          openSidebar={openSidebar}
          {...sidebarHook}
          {...rest}
        />
        <TemplatesSidebar show={Boolean(activeRow)} onClose={closeSidebar}>
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
