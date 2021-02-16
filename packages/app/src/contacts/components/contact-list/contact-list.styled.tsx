/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import ButtonComponent from "Renderer/components/core/button/button.component"
import styled from "styled-components"
// TODO: Remove file when dropdown buttons become available and change to ButtonComponent where it was used
export const HiddenButton = styled(ButtonComponent)<{ hide: boolean }>`
  display: ${({ hide }) => (hide ? "none" : "flex")};
`
