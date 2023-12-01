/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Button from "App/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import styled from "styled-components"

export const DropdownButton = styled(Button).attrs(({ displayStyle }) => ({
  displayStyle: displayStyle || DisplayStyle.Link,
}))`
  padding: 1.7rem 2.4rem;
`
