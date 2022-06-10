/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { TemplatesListProps } from "App/templates/components/templates-list/templates-list.interface"
import { Actions, Col } from "Renderer/components/core/table/table.component"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import {
  TemplatesEmptyState,
  Row,
  Table,
  TemplateIcon,
  IconWrapper,
  Checkbox,
  TemplateText,
} from "App/templates/components/templates-list/templates-list.styled"
import { IconType } from "Renderer/components/core/icon/icon-type"
import Dropdown from "Renderer/components/core/dropdown/dropdown.component"
import { IconButtonWithSecondaryTooltip } from "Renderer/components/core/icon-button-with-tooltip/icon-button-with-secondary-tooltip.component"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { ElementWithTooltipPlace } from "Renderer/components/core/tooltip/element-with-tooltip.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { noop } from "Renderer/utils/noop"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"

const messages = defineMessages({
  emptyStateTitle: { id: "module.templates.emptyList.title" },
  emptyStateDescription: {
    id: "module.templates.emptyList.description",
  },
  dropdownTogllerTooltipDescription: {
    id: "component.dropdownTogllerTooltipDescription",
  },
})

export const TemplatesList: FunctionComponent<TemplatesListProps> = ({
  templates,
  deleteTemplates = noop,
  getRowStatus,
  noneRowsSelected,
  toggleRow,
}) => {
  const handleDeleteClick = (ids: string[]) => {
    deleteTemplates(ids)
  }

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
                <Actions>
                  <Dropdown
                    toggler={
                      <IconButtonWithSecondaryTooltip
                        iconType={IconType.More}
                        description={messages.dropdownTogllerTooltipDescription}
                        // FIXME: The position based on offset is a sticky. However, this is a quick workaround
                        //  for buggy overridePosition lib feature
                        place={ElementWithTooltipPlace.Bottom}
                        offset={{ left: 15, bottom: 5 }}
                      />
                    }
                  >
                    <ButtonComponent
                      labelMessage={{
                        id: "module.template.dropdownDelete",
                      }}
                      Icon={IconType.Delete}
                      onClick={() => handleDeleteClick([template.id])}
                      displayStyle={DisplayStyle.Dropdown}
                      data-testid="dropdown-delete"
                    />
                  </Dropdown>
                </Actions>
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
