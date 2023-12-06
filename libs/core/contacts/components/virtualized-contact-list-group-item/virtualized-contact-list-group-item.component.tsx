/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { VirtualizedContactListGroupItemProps } from "Core/contacts/components/virtualized-contact-list-group-item/virtualized-contact-list-group-item.interface"
import { CategoryLabels } from "Core/contacts/components/virtualized-contact-list-group-item/virtualized-contact-list-group-item.styled"
import { Col } from "Core/__deprecated__/renderer/components/core/table/table.component"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "Core/__deprecated__/renderer/types/function-component.interface"
import React from "react"

export const VirtualizedContactListGroupItem: FunctionComponent<
  VirtualizedContactListGroupItemProps
> = ({ category }) => {
  return (
    <CategoryLabels>
      <Col>
        <Text displayStyle={TextDisplayStyle.Headline4}>{category}</Text>
      </Col>
      <Col />
    </CategoryLabels>
  )
}
