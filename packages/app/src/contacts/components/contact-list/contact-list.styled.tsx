/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"
import styled from "styled-components"
// TODO: Remove file when dropdown buttons become available and change to ButtonComponent where it was used
export const HiddenButton = styled(ButtonComponent)<{ hide: boolean }>`
  display: ${({ hide }) => (hide ? "none" : "flex")};
`
