/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { zIndex } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import styled from "styled-components"

export const VirtualListWrapper = styled.div`
  flex: 1 1 auto;

  /* workaround for https://github.com/petyosi/react-virtuoso/issues/486 */
  [data-test-id="virtuoso-scroller"] {
    div:nth-of-type(2) {
      z-index: calc(${zIndex("dropdown")} + 1);
    }
  }
`
