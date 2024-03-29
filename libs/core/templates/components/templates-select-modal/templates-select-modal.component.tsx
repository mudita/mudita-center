/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import { ModalDialog } from "Core/ui/components/modal-dialog"
import {
  Col,
  RowSize,
} from "Core/__deprecated__/renderer/components/core/table/table.component"
import { TemplatesSelectModalTestIds } from "Core/templates/components/templates-select-modal/templates-select-modal-test-ids.enum"
import { TemplatesSelectModalProps } from "Core/templates/components/templates-select-modal/templates-select-modal.interface"
import {
  TemplateRow,
  TemplatesListWrapper,
} from "Core/templates/components/templates-select-modal/templates-select-modal.styled"

const messages = defineMessages({
  title: { id: "module.templates.attachTemplateModalTitle" },
})

export const TemplatesSelectModal: FunctionComponent<
  TemplatesSelectModalProps
> = ({ open, onClose, onSelect, templates }) => {
  return (
    <ModalDialog
      title={intl.formatMessage(messages.title)}
      size={ModalSize.Medium}
      closeModal={onClose}
      closeButton={false}
      open={open}
    >
      <TemplatesListWrapper
        data-testid={TemplatesSelectModalTestIds.TemplatesList}
      >
        {templates.map((template) => {
          return (
            <TemplateRow
              key={template.id}
              size={RowSize.Small}
              onClick={() => onSelect(template)}
              data-testid={TemplatesSelectModalTestIds.TemplatesRow}
            >
              <Col>{template.text}</Col>
            </TemplateRow>
          )
        })}
      </TemplatesListWrapper>
    </ModalDialog>
  )
}
