import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { notes } from "Renderer/components/core/table/table.fake-data"
import TemplatesPanel from "Renderer/components/rest/messages/templates/templates-panel.component"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import TemplatesList from "Renderer/components/rest/messages/templates/templates-list.component"
import { TableWithSidebarWrapper } from "Renderer/components/core/table/table.component"

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
        <TemplatesList templates={notes} {...rest} />
      </TableWithSidebarWrapper>
    </>
  )
}

export default Templates
