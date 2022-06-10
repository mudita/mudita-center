/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import { backgroundColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import Text from "App/__deprecated__/renderer/components/core/text/text.component"

export const FilesManagerContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${backgroundColor("main")};
`

export const FilesSummaryContainer = styled.div`
  padding: 2.4rem 3.2rem;
`
export const FilesSummaryHeading = styled(Text)`
  margin-bottom: 2.4rem;
`

export const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.2rem;
  margin-bottom: 4rem;
`
