/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import InputCheckbox from "App/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"
import { ModalIcon } from "App/__deprecated__/renderer/components/core/modal-shared/modal-shared"
import Table from "App/__deprecated__/renderer/components/core/table/table.component"
import Text from "App/__deprecated__/renderer/components/core/text/text.component"
import styled from "styled-components"

export const Checkbox = styled(InputCheckbox)`
  margin-right: 2rem;
  flex-shrink: 0;
`

export const TableContent = styled.div`
  overflow-y: scroll;
  height: 19.2rem;
`

export const SyncTable = styled(Table)`
  --columnsTemplate: 1fr 1fr auto;
  margin-top: 4.8rem;
`

export const Image = styled(ModalIcon)`
  margin: 1.6rem auto 3.2rem;
`

export const SubtitleText = styled(Text)`
  margin-bottom: 0.8rem;
  text-align: center;
`
