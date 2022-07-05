/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import { ModalDialog } from "App/ui/components/modal-dialog"
import Table, {
  Col,
  Row,
  RowSize,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import {
  TemplatesSelectModalTestIds,
  TemplatesSelectModalProps,
} from "App/templates/components/templates-select-modal"

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
      <Table data-testid={TemplatesSelectModalTestIds.TemplatesList}>
        {templates.map((template) => {
          return (
            <Row
              key={template.order}
              size={RowSize.Small}
              onClick={() => onSelect(template)}
              data-testid={TemplatesSelectModalTestIds.TemplatesRow}
            >
              <Col>{template.text}</Col>
            </Row>
          )
        })}
      </Table>
    </ModalDialog>
  )
}
