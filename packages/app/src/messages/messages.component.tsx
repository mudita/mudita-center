/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChangeEvent } from "react"
import { connect } from "react-redux"
import { RootModel } from "Renderer/models/models"
import Messages from "App/messages/messages-ui.component"
import { select } from "Renderer/store"
import { VisibilityFilter } from "App/messages/store/messages.interface"

const selector = select(({ messages, contacts }) => ({
  threads: messages.filteredThreads,
  getContact: contacts.getContact,
  getMessagesByThreadId: messages.getMessagesByThreadId,
  getMessagesResultMapStateByThreadId:
    messages.getMessagesResultMapStateByThreadId,
  attachContactList: contacts.contactList,
  attachContactFlatList: contacts.flatList,
  isContactCreated: contacts.isContactCreated,
}))

const mapStateToProps = (state: RootModel) => ({
  ...state.messages,
  ...state.settings,
  ...selector(state, {}),
})

const mapDispatchToProps = (dispatch: any) => ({
  changeSearchValue: ({ target }: ChangeEvent<HTMLInputElement>) =>
    dispatch.messages.changeSearchValue(target.value),
  changeVisibilityFilter: (filter: VisibilityFilter) =>
    dispatch.messages.changeVisibilityFilter(filter),
  deleteThreads: (ids: string[]) => dispatch.messages.deleteThreads(ids),
  markAsRead: (ids: string[]) => dispatch.messages.markAsRead(ids),
  toggleReadStatus: (ids: string[]) => dispatch.messages.toggleReadStatus(ids),
  loadMessagesByThreadId: (threadId: string) =>
    dispatch.messages.loadMessagesByThreadId(threadId),
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
