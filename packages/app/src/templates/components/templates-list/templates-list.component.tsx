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
} from "App/templates/components/templates-list/templates-list.styled"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { Size } from "App/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"
import { TemplateOptions } from "App/templates/components/template-options"

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
  return (
    <Table role="list" hide hideableColumnsIndexes={[2, 3, 4]}>
      {templates.length > 0 ? (
        templates.map((template) => {
          const { selected, indeterminate } = getRowStatus(template)
          const handleCheckboxChange = () => toggleRow(template)
          return (
            <Row key={template.id} role="listitem">
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
              <TemplateText displayStyle={TextDisplayStyle.Paragraph1}>
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
          )
        })
      ) : (
        <TemplatesEmptyState
          title={messages.emptyStateTitle}
          description={messages.emptyStateDescription}
        />
      )}
    </Table>
  )
}
