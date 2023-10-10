/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
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
  TemplateTextColumn,
} from "App/templates/components/templates-list/templates-list.styled"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { Size } from "App/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"
import { TemplateOptions } from "App/templates/components/template-options"
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
} from "react-beautiful-dnd"

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
  toggleRow,
  selectedItems,
  deleteTemplates,
  updateTemplate,
  onDragEnd,
  templateFormOpen,
  active,
}) => {
  const noneRowsSelected = selectedItems.length === 0

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" type="COLUMN">
          {/* AUTO DISABLED - fix me if you like :) */}
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {(provided: any) => (
            <Table
              role="list"
              hideColumns={templateFormOpen}
              hideableColumnsIndexes={[3]}
              mouseLock={templateFormOpen}
              // AUTO DISABLED - fix me if you like :)
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              {...provided.droppableProps}
              // AUTO DISABLED - fix me if you like :)
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              ref={provided.innerRef}
            >
              {templates.length > 0 ? (
                templates.map((template, index) => {
                  const selected = selectedItems.includes(template.id)
                  const handleCheckboxChange = () => toggleRow(template.id)

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
                          active={active?.id === template.id}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Col />
                          <Col>
                            <Checkbox
                              checked={selected}
                              onChange={handleCheckboxChange}
                              size={Size.Large}
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
                          <TemplateTextColumn
                            onClick={() => updateTemplate(template.id)}
                          >
                            <TemplateText
                              displayStyle={TextDisplayStyle.Paragraph1}
                            >
                              {template.text}
                            </TemplateText>
                          </TemplateTextColumn>
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
              {/* AUTO DISABLED - fix me if you like :) */}
              {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
              {provided.placeholder}
            </Table>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}
