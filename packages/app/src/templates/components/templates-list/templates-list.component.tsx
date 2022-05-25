/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { TemplatesListProps } from "App/templates/components/templates-list/templates-list.interface"
import { Col } from "Renderer/components/core/table/table.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import {
  TemplatesEmptyState,
  Row,
  Table,
  TemplateIcon,
  IconWrapper,
} from "App/templates/components/templates-list/templates-list.styled"
import { IconType } from "Renderer/components/core/icon/icon-type"

const messages = defineMessages({
  emptyStateTitle: { id: "module.templates.emptyList.title" },
  emptyStateDescription: {
    id: "module.templates.emptyList.description",
  },
})

export const TemplatesList: FunctionComponent<TemplatesListProps> = ({
  templates,
}) => {
  return (
    <Table role="list" hide hideableColumnsIndexes={[2, 3, 4]}>
      {templates.length > 0 ? (
        templates.map((template) => (
          <Row key={template.id} role="listitem">
            <Col />
            <Col>
              <IconWrapper>
                <TemplateIcon type={IconType.Template} width={3} height={3} />
              </IconWrapper>
            </Col>
            <Text displayStyle={TextDisplayStyle.Paragraph1}>
              {template.text}
            </Text>
          </Row>
        ))
      ) : (
        <TemplatesEmptyState
          title={messages.emptyStateTitle}
          description={messages.emptyStateDescription}
        />
      )}
    </Table>
  )
}
