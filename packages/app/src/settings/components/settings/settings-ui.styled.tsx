/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import { borderColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import { Name } from "App/__deprecated__/renderer/components/rest/messages/threads-table.component"
import { IconButtonWithPrimaryTooltip } from "App/__deprecated__/renderer/components/core/icon-button-with-tooltip/icon-button-with-primary-tooltip.component"
import Text from "App/__deprecated__/renderer/components/core/text/text.component"

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

export const SettingsLabel = styled(Name)`
  margin-left: 3.2rem;
  margin-bottom: 0;
  align-self: center;
`

export const SettingsDescriptionWrapper = styled.div`
  border-bottom: solid 0.1rem ${borderColor("list")};
`

export const SettingsDescription = styled(Text)`
  margin-left: 3.2rem;
  margin-bottom: 3.2rem;
`

export const SettingsTooltip = styled(IconButtonWithPrimaryTooltip)`
  margin-left: 0.4rem;
`

export const SettingsWrapper = styled.section``
