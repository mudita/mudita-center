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
import { Feature, flags } from "App/feature-flags"

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
  onDragEnd,
  templateFormOpen,
  active,
}) => {
  return (
    <>
      {flags.get(Feature.OrderTemplate) ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" type="COLUMN">
            {(provided: any) => (
              <Table
                role="list"
                hideColumns={templateFormOpen}
                hideableColumnsIndexes={[3]}
                mouseLock={templateFormOpen}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {templates.length > 0 ? (
                  templates.map((template, index) => {
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
                {provided.placeholder}
              </Table>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <Table
          role="list"
          hideColumns={templateFormOpen}
          hideableColumnsIndexes={[3]}
          mouseLock={templateFormOpen}
        >
          {templates.length > 0 ? (
            templates.map((template) => {
              const { selected, indeterminate } = getRowStatus(template)
              const handleCheckboxChange = () => toggleRow(template)

              return (
                <Row
                  key={template.id}
                  role="listitem"
                  active={active?.id === template.id}
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
                  <TemplateTextColumn
                    onClick={() => updateTemplate(template.id)}
                  >
                    <TemplateText displayStyle={TextDisplayStyle.Paragraph1}>
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
              )
            })
          ) : (
            <TemplatesEmptyState
              title={messages.emptyStateTitle}
              description={messages.emptyStateDescription}
            />
          )}
        </Table>
      )}
    </>
  )
}
