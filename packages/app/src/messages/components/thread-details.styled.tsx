/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import styled from "styled-components"
import Text from "Renderer/components/core/text/text.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import InputComponent from "Renderer/components/core/input-text/input-text.component"
import { Sidebar } from "Renderer/components/core/table/table.component"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { buttonComponentAnimationStyles } from "Renderer/components/core/button/button.styled.elements"
import Button from "Renderer/components/core/button/button.component"

export const PhoneNumberText = styled(Text)`
  margin-top: 0.8rem;
`

export const MessagesWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 3rem;
  overflow: auto;
`

export const MessageBubblesWrapper = styled.div`
  margin-top: 1.2rem;
  margin-bottom: 2.4rem;
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
`

export const NameWrapper = styled.div`
  display: flex;
`

export const LeadingButton = styled(ButtonComponent).attrs(() => ({
  displayStyle: DisplayStyle.IconOnly2,
}))`
  ${buttonComponentAnimationStyles};
`

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
