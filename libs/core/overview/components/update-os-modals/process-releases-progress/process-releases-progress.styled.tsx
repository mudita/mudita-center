/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Text from "Core/__deprecated__/renderer/components/core/text/text.component"
import { textColor } from "Core/core/styles/theming/theme-getters"
import styled from "styled-components"

export const ProgressText = styled(Text)`
  span {
    color: ${textColor("disabled")};
  }
`
