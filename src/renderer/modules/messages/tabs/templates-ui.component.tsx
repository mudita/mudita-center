import React, { ChangeEvent } from "react"
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

const messages = defineMessages({
  charactersNumber: { id: "view.name.messages.templates.charactersNumber" },
})

const TemplatesSidebar = styled(Sidebar)`
  --header-height: 5.6rem;
  border-top: none;
`

export interface Template {
  id: string
  text: string
}

export interface TemplatesProps {
  templates: Template[]
  onDeleteButtonClick: () => void
  onNewButtonClick: () => void
  onSearchTermChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const Templates: FunctionComponent<TemplatesProps> = ({
  onDeleteButtonClick,
  onNewButtonClick,
  onSearchTermChange,
  templates = [],
}) => {
  const { selectedRows, allRowsSelected, toggleAll, ...rest } = useTableSelect<
    Template
  >(templates)

  const sidebarHook = useTableSidebar<Template>()
  const { closeSidebar, activeRow } = sidebarHook

  const textEditorHook = useTextEditor(activeRow)
  const {
    temporaryText: { length: textLength },
  } = textEditorHook

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
        <TemplatesList templates={templates} {...sidebarHook} {...rest} />
        <TemplatesSidebar show={Boolean(activeRow)} onClose={closeSidebar}>
          {activeRow && (
            <TextEditor
              {...textEditorHook}
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
