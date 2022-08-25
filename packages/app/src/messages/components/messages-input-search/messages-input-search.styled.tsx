/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"
import { ListItem } from "App/__deprecated__/renderer/components/core/list/list.component"
import { backgroundColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import InputSearch from "App/__deprecated__/renderer/components/core/input-search/input-search.component"
import Text from "App/__deprecated__/renderer/components/core/text/text.component"

export const ContactListItem = styled(ListItem)<{
  active: boolean
}>`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 1.6rem;
  :not(:last-of-type) {
    border-bottom: none;
  }
  :first-of-type {
    padding-top: 1.6rem;
  }
  :last-of-type {
    padding-bottom: 1.6rem;
  }
  ${({ active }) =>
    active &&
    css`
      background-color: ${backgroundColor("minor")};
    `};
`
export const MessagesInputSelect = styled(InputSearch)`
  width: 28rem;
`

export const ContactListItemName = styled(Text)`
  font-weight: 400;
  margin-bottom: 0.4rem;
`
