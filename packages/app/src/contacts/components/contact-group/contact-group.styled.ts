/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import { Labels } from "App/__deprecated__/renderer/components/core/table/table.component"

export const CategoryLabels = styled(Labels)`
  align-items: end;
  background-color: var(--rowBackground) !important;
  grid-template-columns: 1fr;
  > div:first-child {
    margin-bottom: 1.5rem;
    margin-left: 3.2rem;
  }
`
