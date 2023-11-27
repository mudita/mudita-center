/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { useDispatch } from "react-redux"
import { Draggable } from "react-beautiful-dnd"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  Checkbox,
  IconWrapper,
  Row,
  TemplateIcon,
  TemplateText,
  TemplateTextColumn,
} from "App/templates/components/templates-list/templates-list.styled"
import { Col } from "App/__deprecated__/renderer/components/core/table/table.component"
import { Size } from "App/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import { TemplateOptions } from "App/templates/components/template-options"
import { toggleItem } from "App/templates/actions"
import { Dispatch } from "App/__deprecated__/renderer/store"
import { Template } from "App/templates/dto"

interface Props {
  template: Template
  index: number
  active: boolean
  selected: boolean
  noneRowsSelected: boolean
  deleteTemplates: (ids: string[]) => void
  updateTemplate: (id: string) => void
}

const TemplatesListItem: FunctionComponent<Props> = ({
  template,
  active,
  selected,
  noneRowsSelected,
  deleteTemplates,
  updateTemplate,
  ...props
}) => {
  const dispatch = useDispatch<Dispatch>()
  const handleCheckboxChange = () => dispatch(toggleItem(template.id))
  const handleTextColumnClick = () => updateTemplate(template.id)

  return (
    <Draggable draggableId={template.id} {...props}>
      {(provided) => (
        <Row
          role="listitem"
          ref={provided.innerRef}
          active={active}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Col />
          <Col>
            <Checkbox
              data-testid="template-checkbox"
              size={Size.Large}
              checked={selected}
              visible={!noneRowsSelected}
              onChange={handleCheckboxChange}
            />
            {noneRowsSelected && (
              <IconWrapper>
                <TemplateIcon type={IconType.Template} width={3} height={3} />
              </IconWrapper>
            )}
          </Col>
          <TemplateTextColumn onClick={handleTextColumnClick}>
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
      )}
    </Draggable>
  )
}

export default TemplatesListItem
