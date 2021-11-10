/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Renderer/store"
import { MessagesState } from "App/messages/reducers"
import { Selector } from "reselect"

export const messagesStateSelector: Selector<ReduxRootState, MessagesState> = (
  state
) => state.messages
