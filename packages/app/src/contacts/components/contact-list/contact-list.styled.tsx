/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import Table from "App/__deprecated__/renderer/components/core/table/table.component"

export const SelectableContacts = styled(Table)<{ mouseLock?: boolean }>`
  min-width: 32rem;
  flex: 1;
  overflow: auto;
  --columnsTemplate: 8.8rem 1fr 11.5rem 11.5rem auto;
  --columnsTemplateWithOpenedSidebar: 8.8rem 1fr;
  --columnsGap: 0;
  pointer-events: ${({ mouseLock }) => (mouseLock ? "none" : "all")};
`
