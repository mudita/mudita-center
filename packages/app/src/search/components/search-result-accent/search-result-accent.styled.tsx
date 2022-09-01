/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import { textColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import Text from "App/__deprecated__/renderer/components/core/text/text.component"

export const ResultString = styled(Text)`
  margin-bottom: 0.4rem;
  color: ${textColor("secondary")};

  strong {
    color: ${textColor("primary")};
  }
`
