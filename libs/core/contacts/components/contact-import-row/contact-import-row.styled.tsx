/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Col } from "Core/__deprecated__/renderer/components/core/table/table.component"
import Text from "Core/__deprecated__/renderer/components/core/text/text.component"
import { textColor } from "Core/core/styles/theming/theme-getters"
import styled from "styled-components"

export const Failed = styled(Col)`
  color: ${textColor("error")};
`

export const Name = styled(Text)``
