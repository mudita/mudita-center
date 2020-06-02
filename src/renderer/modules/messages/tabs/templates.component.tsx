import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { notes } from "Renderer/components/core/table/table.fake-data"
import { noop } from "Renderer/utils/noop"
import TemplatesPanel from "Renderer/components/rest/messages/templates/templates-panel.component"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import TemplatesList from "Renderer/components/rest/messages/templates/templates-list.component"
import { TableWithSidebarWrapper } from "Renderer/components/core/table/table.component"

export interface Template {
  id: string
  text: string
}

interface TemplatesProps {
  onDeleteButtonClick: () => void
  onNewButtonClick: () => void
}

const Templates: FunctionComponent<TemplatesProps> = ({
  onDeleteButtonClick,
  onNewButtonClick,
}) => {
  const { selectedRows, allRowsSelected, toggleAll, ...rest } = useTableSelect<
    Template
  >(notes)

  return (
    <>
      <TemplatesPanel
        onDeleteButtonClick={onDeleteButtonClick}
        onNewButtonClick={onNewButtonClick}
        onSearchTermChange={noop}
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
