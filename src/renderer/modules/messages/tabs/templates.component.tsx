import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { notes } from "Renderer/components/core/table/table.fake-data"
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
import { asyncNoop } from "Renderer/utils/noop"
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
  onDeleteButtonClick: () => void
  onNewButtonClick: () => void
  onSearchTermChange: () => void
}

const Templates: FunctionComponent<TemplatesProps> = ({
  onDeleteButtonClick,
  onNewButtonClick,
  onSearchTermChange,
}) => {
  const { selectedRows, allRowsSelected, toggleAll, ...rest } = useTableSelect<
    Template
  >(notes)

  const sidebarHook = useTableSidebar<Template>()
  const { closeSidebar, activeRow } = sidebarHook

  const textEditorHook = useTextEditor(activeRow, asyncNoop)
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
        <TemplatesList templates={notes} {...sidebarHook} {...rest} />
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
