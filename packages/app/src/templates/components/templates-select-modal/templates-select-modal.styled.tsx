/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import Table, {
  Col,
  Row,
  RowSize,
} from "App/__deprecated__/renderer/components/core/table/table.component"

export const TemplateRow = styled(Row)<{ size: RowSize }>`
  min-height: size;
  height: auto;
  ${Col} {
    padding-top: 1.3rem;
    padding-bottom: 1.3rem;
  }
`

export const TemplatesListWrapper = styled(Table)`
  max-height: 54rem;
  overflow: scroll;
`
