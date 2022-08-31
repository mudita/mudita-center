/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"
import {
  backgroundColor,
  borderColor,
  textColor,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import { ListItem } from "App/__deprecated__/renderer/components/core/list/list.component"
import Text from "App/__deprecated__/renderer/components/core/text/text.component"
import InputSearch from "App/__deprecated__/renderer/components/core/input-search/input-search.component"

export const MessageListItemGroupWrapper = styled.div`
  width: 100%;
  border-top: solid 0.1rem ${borderColor("list")};
  padding-top: 1.2rem;
`

export const MessageListItem = styled(ListItem)<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  padding: 0.8rem 1.6rem;
  :not(:last-of-type) {
    border-bottom: none;
  }
  :first-of-type {
    padding-top: 1.6rem;

    ${MessageListItemGroupWrapper} {
      border-top: 0;
      padding-top: 0;
    }
  }
  :last-of-type {
    padding-bottom: 1.6rem;
  }
  ${({ active }) =>
    active &&
    css`
      background-color: ${backgroundColor("minor")};
    `}
`

export const MessageListItemInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const MessageListItemWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const MessageListItemGroupName = styled(Text)`
  text-transform: uppercase;
  color: ${textColor("secondary")};
`

export const MessageListItemContent = styled(Text)`
  margin-bottom: 0.4rem;
  color: ${textColor("secondary")};

  strong {
    color: ${textColor("primary")};
  }
`

export const MessagesInputSelect = styled(InputSearch)`
  width: 28rem;
`

export const MessageConversationIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`
