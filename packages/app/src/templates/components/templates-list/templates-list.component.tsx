/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState } from "react"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { TemplatesListProps } from "App/templates/components/templates-list/templates-list.interface"
import { Col } from "App/__deprecated__/renderer/components/core/table/table.component"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import {
  TemplatesEmptyState,
  Row,
  Table,
  TemplateIcon,
  IconWrapper,
  Checkbox,
  TemplateText,
} from "App/templates/components/templates-list/templates-list.styled"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { Size } from "App/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"
import { TemplateOptions } from "App/templates/components/template-options"
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
  DropResult,
} from "react-beautiful-dnd"
import { Template } from "App/templates/dto"

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
  templates,
  getRowStatus,
  noneRowsSelected,
  toggleRow,
  deleteTemplates,
  updateTemplate,
}) => {
  const [templatesList, setTemplateList] = useState<Template[]>(templates)

  const reorder = (
    list: Template[],
    startIndex: number,
    endIndex: number
  ): Template[] => {
    const result: Template[] = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const items: Template[] = reorder(
      templatesList,
      result.source.index,
      result.destination.index
    )

    setTemplateList(items)
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided: any) => (
          <Table
            role="list"
            hide
            hideableColumnsIndexes={[2, 3, 4]}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {templatesList.length > 0 ? (
              templatesList.map((template, index) => {
                const { selected, indeterminate } = getRowStatus(template)
                const handleCheckboxChange = () => toggleRow(template)
                return (
                  <Draggable
                    key={template.id}
                    draggableId={template.id}
                    index={index}
                  >
                    {(provided: DraggableProvided) => (
                      <Row
                        key={template.id}
                        role="listitem"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Col />
                        <Col>
                          <Checkbox
                            checked={selected}
                            onChange={handleCheckboxChange}
                            size={Size.Large}
                            indeterminate={indeterminate}
                            visible={!noneRowsSelected}
                            data-testid="template-checkbox"
                          />
                          {noneRowsSelected && (
                            <IconWrapper>
                              <TemplateIcon
                                type={IconType.Template}
                                width={3}
                                height={3}
                              />
                            </IconWrapper>
                          )}
                        </Col>
                        <TemplateText
                          displayStyle={TextDisplayStyle.Paragraph1}
                        >
                          {template.text}
                        </TemplateText>
                        <Col>
                          <TemplateOptions
                            templateId={template.id}
                            onDelete={deleteTemplates}
                            onUpdate={updateTemplate}
                          />
                        </Col>
                      </Row>
                    )}
                  </Draggable>
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
  )
}
