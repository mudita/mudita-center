/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { basicAvatarStyles } from "App/__deprecated__/renderer/components/core/avatar/avatar.component"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"
import Table from "App/__deprecated__/renderer/components/core/table/table.component"
import { backgroundColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import styled, { css } from "styled-components"
// TODO: Remove file when dropdown buttons become available and change to ButtonComponent where it was used
export const HiddenButton = styled(ButtonComponent)<{ hide: boolean }>`
  display: ${({ hide }) => (hide ? "none" : "flex")};
`

export const lightAvatarStyles = css`
  background-color: ${backgroundColor("row")};
`

export const AvatarPlaceholder = styled.div`
  ${basicAvatarStyles};
  margin-right: 1.6rem;
  margin-left: 3.2rem;
`

export const SelectableContacts = styled(Table)<{ mouseLock?: boolean }>`
  min-width: 32rem;
  flex: 1;
  overflow: auto;
  --columnsTemplate: 8.8rem 1fr 11.5rem 11.5rem auto;
  --columnsTemplateWithOpenedSidebar: 8.8rem 1fr;
  --columnsGap: 0;
  pointer-events: ${({ mouseLock }) => (mouseLock ? "none" : "all")};
`
