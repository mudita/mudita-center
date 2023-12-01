/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import Text from "App/__deprecated__/renderer/components/core/text/text.component"
import { fontWeight } from "App/__deprecated__/renderer/styles/theming/theme-getters"

export const Title = styled(Text)`
  font-size: 3rem;
  margin-bottom: 0.8rem;
  font-weight: ${fontWeight("default")};
`
