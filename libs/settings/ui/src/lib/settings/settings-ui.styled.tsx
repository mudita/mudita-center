/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import { borderColor } from "app-theme/utils"
import { LegacyText } from "app-theme/ui"

export const SettingsTableRow = styled.div`
  display: grid;
  box-sizing: border-box;
  grid-template-areas: "Checkbox Actions";
  grid-template-columns: 1fr 16.4rem;
  border-bottom: solid 0.1rem ${borderColor("list")};
  height: 7.2rem;
  max-height: 7.2rem;
`

export const Data = styled.div`
  grid-area: Checkbox;
  align-self: center;
  display: flex;
  flex-direction: row;
`

export const SettingsLabel = styled(LegacyText)`
  margin-left: 3.2rem;
  margin-bottom: 0;
  align-self: center;
  grid-area: Label;
`
