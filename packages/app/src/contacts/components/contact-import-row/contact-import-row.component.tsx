/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Failed,
  Name,
} from "App/contacts/components/contact-import-row/contact-import-row.styled"
import { ContactImportRowTestIds } from "App/contacts/components/contact-import-row/contact-import-row-test-ids.enum"
import { Checkbox } from "App/contacts/components/contact-import/contact-import-modal.styled"
import { createFullNameStartingFromLastName } from "App/contacts/helpers/contacts.helpers"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import {
  Col,
  Row,
  RowSize,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import React from "react"

import { ContactImportRowProperties } from "App/contacts/components/contact-import-row/contact-import-row.interface"
import { ModalType } from "App/contacts/components/contact-import/contact-import-modal.enum"

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
            size={2}
          />
        )}
      </Failed>
    </Row>
  )
}
