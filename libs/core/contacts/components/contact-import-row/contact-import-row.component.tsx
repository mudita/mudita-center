/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Failed,
  Name,
} from "Core/contacts/components/contact-import-row/contact-import-row.styled"
import { ContactImportRowTestIds } from "Core/contacts/components/contact-import-row/contact-import-row-test-ids.enum"
import { Checkbox } from "Core/contacts/components/contact-import/contact-import-modal.styled"
import { createFullNameStartingFromLastName } from "Core/contacts/helpers/contacts.helpers"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import Icon, {
  IconSize,
} from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import {
  Col,
  Row,
  RowSize,
} from "Core/__deprecated__/renderer/components/core/table/table.component"
import { TextDisplayStyle } from "Core/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "Core/__deprecated__/renderer/types/function-component.interface"
import React from "react"

import { ContactImportRowProperties } from "Core/contacts/components/contact-import-row/contact-import-row.interface"
import { ModalType } from "Core/contacts/components/contact-import/contact-import-modal.enum"

export const ContactImportRow: FunctionComponent<
  ContactImportRowProperties
> = ({ data, toggleRow, getRowStatus, modalType, testId }) => {
  const onChange = () => {
    toggleRow(data)
  }
  const { selected, indeterminate } = getRowStatus(data)
  return (
    <Row size={RowSize.Small} useMinRowHeight data-testid={testId}>
      <Col>
        {[ModalType.Select, ModalType.Fail].includes(modalType) && (
          <Checkbox
            checked={selected}
            indeterminate={indeterminate}
            onChange={onChange}
            data-testid={ContactImportRowTestIds.RowCheckbox}
          />
        )}
        <Name displayStyle={TextDisplayStyle.Paragraph1}>
          {createFullNameStartingFromLastName(data)}
        </Name>
      </Col>
      <Col>
        {data.primaryPhoneNumber || data.secondaryPhoneNumber}
        {data.primaryPhoneNumber && data.secondaryPhoneNumber
          ? ", " + data.secondaryPhoneNumber
          : ""}
      </Col>
      <Failed>
        {modalType === ModalType.Fail && (
          <Icon
            data-testid={ContactImportRowTestIds.FailedIcon}
            type={IconType.FailRed}
            size={IconSize.Medium}
          />
        )}
      </Failed>
    </Row>
  )
}
