/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import Text from "App/__deprecated__/renderer/components/core/text/text.component"
import {
  backgroundColor,
  zIndex,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import InputComponent from "App/__deprecated__/renderer/components/core/input-text/input-text.component"
import { Sidebar } from "App/__deprecated__/renderer/components/core/table/table.component"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import Button from "App/__deprecated__/renderer/components/core/button/button.component"
import { IconSize } from "App/__deprecated__/renderer/components/core/icon/icon.component"

export const PhoneNumberText = styled(Text)`
  margin-top: 0.8rem;
`

export const MessagesWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 3rem;
  overflow-y: auto;
  overflow-x: hidden;
`

/**
 * Having equal and divided padding for MessageBubblesWrapper and BottomWrapper
 * works fine for scrolling experience and detecting when new message notification
 * should be shown
 */
export const MessageBubblesWrapper = styled.div`
  padding-bottom: 3rem;
`

export const BottomWrapper = styled.div`
  padding-top: 3rem;
`

export const TextareaWrapper = styled.div`
  position: sticky;
  bottom: 0;
  background-color: ${backgroundColor("row")};
  padding: 0 3rem;
`

export const Textarea = styled(InputComponent)`
  margin-bottom: 1.6rem;
`

export const MessagesSidebar = styled(Sidebar)`
  border-top: none;
  z-index: ${zIndex("content")};
`

export const NameWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const IconButton = styled(ButtonComponent).attrs(() => ({
  displayStyle: DisplayStyle.IconOnly,
  iconSize: IconSize.Medium,
}))``

export const Content = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ColumnContent = styled(Content)`
  flex-direction: column;
`

export const RetryButton = styled(Button)`
  margin-top: 1.4rem;
`
