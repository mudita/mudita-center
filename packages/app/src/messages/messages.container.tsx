/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChangeEvent } from "react"
import { connect } from "react-redux"
import Messages from "App/messages/components/messages/messages.component"
import { ReduxRootState, TmpDispatch, select, RootState } from "Renderer/store"
import {
  Message,
  NewMessage,
  VisibilityFilter,
} from "App/messages/reducers/messages.interface"
import {
  changeSearchValue,
  changeVisibilityFilter,
  deleteThreads,
  markThreadsAsRead,
  toggleThreadsReadStatus,
} from "App/messages/actions/base.action"
import {
  addNewMessage,
  loadMessagesById,
  loadThreads,
} from "App/messages/actions"
import {
  filteredThreadsSelector,
  getMessagesByThreadIdSelector,
  getMessagesStateByThreadIdSelector,
  getReceiverSelector,
  getReceiversSelector,
} from "App/messages/selectors"
import { PaginationBody } from "@mudita/pure"
import { PayloadAction } from "@reduxjs/toolkit"
import { GetMessagesBody } from "Backend/adapters/pure-phone-messages/pure-phone-messages.class"

const selector = select(({ contacts }) => ({
  getContact: contacts.getContact,
  getContactByPhoneNumber: contacts.getContactByPhoneNumber,
  attachContactList: contacts.contactList,
  attachContactFlatList: contacts.flatList,
  isContactCreatedByPhoneNumber: contacts.isContactCreatedByPhoneNumber,
}))

const mapStateToProps = (state: RootState & ReduxRootState) => ({
  ...selector(state, {}),
  ...state.settings,
  threadsState: state.messages.threadsState,
  threadsTotalCount: state.messages.threadsTotalCount,
  threads: filteredThreadsSelector(state),
  receivers: getReceiversSelector(state),
  getReceiver: (phoneNumber: string) => getReceiverSelector(phoneNumber)(state),
  getMessagesByThreadId: (threadId: string) =>
    getMessagesByThreadIdSelector(threadId)(state),
  getMessagesStateByThreadId: (threadId: string) =>
    getMessagesStateByThreadIdSelector(threadId)(state),
})

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  loadThreads: (
    pagination: PaginationBody
  ): Promise<PayloadAction<PaginationBody>> =>
    dispatch(loadThreads(pagination)),
  changeSearchValue: ({ target }: ChangeEvent<HTMLInputElement>) =>
    dispatch(changeSearchValue(target.value)),
  changeVisibilityFilter: (filter: VisibilityFilter) =>
    dispatch(changeVisibilityFilter(filter)),
  deleteThreads: (threadIds: string[]) => dispatch(deleteThreads(threadIds)),
  markAsRead: (threadIds: string[]) => dispatch(markThreadsAsRead(threadIds)),
  toggleReadStatus: (threadIds: string[]) =>
    dispatch(toggleThreadsReadStatus(threadIds)),
  loadMessagesByThreadId: (body: GetMessagesBody) =>
    dispatch(loadMessagesById(body)),
  addNewMessage: async (newMessage: NewMessage): Promise<Message | undefined> =>
    dispatch(addNewMessage(newMessage)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
