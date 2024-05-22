/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import {
  Col,
  TextPlaceholder,
} from "Core/__deprecated__/renderer/components/core/table/table.component"
import { ThreadListTestIds } from "Core/messages/components/thread-list-test-ids.enum"
import { AvatarPlaceholder } from "Core/contacts/components/contact-list/contact-list.styled"
import styled from "styled-components"
import ThreadBaseRow from "Core/messages/components/thread-base-row.component"
import { ListRowProps } from "react-virtualized"

const ThreadPlaceholderRowContainer = styled(ThreadBaseRow)``

interface Props {
  style: ListRowProps["style"]
}

const ThreadPlaceholderRow: FunctionComponent<Props> = (props) => {
  return (
    <ThreadPlaceholderRowContainer {...props}>
      <Col />
      <Col data-testid={ThreadListTestIds.Row}>
        <AvatarPlaceholder />
        <TextPlaceholder charsCount={0} />
      </Col>
    </ThreadPlaceholderRowContainer>
  )
}

export default ThreadPlaceholderRow
