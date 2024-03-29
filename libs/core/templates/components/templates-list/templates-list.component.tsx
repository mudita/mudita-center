/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { TemplatesListProps } from "Core/templates/components/templates-list/templates-list.interface"
import {
  Table,
  TemplatesEmptyState,
} from "Core/templates/components/templates-list/templates-list.styled"
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd"
import TemplatesListItem from "Core/templates/components/templates-list-item/templates-list-item"
import { reorder } from "Core/templates/helpers/templates-order.helpers"
import { templatesListSelector } from "Core/templates/selectors"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { updateTemplateOrder } from "Core/templates/actions"
import { Template } from "Core/templates/dto"

const messages = defineMessages({
  emptyStateTitle: { id: "module.templates.emptyList.title" },
  emptyStateDescription: {
    id: "module.templates.emptyList.description",
  },
  dropdownTogglerTooltipDescription: {
    id: "component.dropdownTogglerTooltipDescription",
  },
})

export const TemplatesList: FunctionComponent<TemplatesListProps> = ({
  selectedTemplateIds,
  deleteTemplates,
  updateTemplate,
  templateReordered,
  templateFormOpen,
  activeTemplate,
}) => {
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>()
  const dispatch = useDispatch<Dispatch>()
  const templates = useSelector(templatesListSelector)
  const loading = useSelector(
    (state: ReduxRootState) => state.templates.loading
  )
  const noneTemplateSelected = selectedTemplateIds.length === 0

  const [localTemplates, setLocalTemplates] = useState<Template[]>(templates)

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  useEffect(() => {
    if (loading) {
      return
    }
    setLocalTemplates(templates)
  }, [templates, loading])

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (source.index !== destination?.index) {
      if (!destination) {
        return
      }
      templateReordered()

      const list = [...localTemplates]
      const [removed] = list.splice(source.index, 1)
      list.splice(destination.index, 0, removed)
      const updatedTemplates = reorder(list)
      setLocalTemplates(updatedTemplates)
      // Delaying the invocation of updateTemplateOrder after drag-and-drop operation
      // helps control the component's re-rendering, eliminating subtle flickering.
      timeoutRef.current = setTimeout(
        () => void dispatch(updateTemplateOrder(updatedTemplates))
      )
    }
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" type="COLUMN">
          {(provided) => (
            <Table
              role="list"
              hideColumns={templateFormOpen}
              hideableColumnsIndexes={[3]}
              mouseLock={templateFormOpen}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {localTemplates.length > 0 ? (
                localTemplates.map((template, index) => {
                  const selected = selectedTemplateIds.includes(template.id)
                  return (
                    <TemplatesListItem
                      index={index}
                      key={template.id}
                      active={activeTemplate?.id === template.id}
                      selected={selected}
                      template={template}
                      noneRowsSelected={noneTemplateSelected}
                      deleteTemplates={deleteTemplates}
                      updateTemplate={updateTemplate}
                    />
                  )
                })
              ) : (
                <TemplatesEmptyState
                  title={messages.emptyStateTitle}
                  description={messages.emptyStateDescription}
                />
              )}
              {provided.placeholder}
            </Table>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}
