/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChangeEvent } from "react"
import { connect } from "react-redux"
import { RootModel } from "Renderer/models/models"
import Messages from "App/messages/components/messages/messages.component"
import { ReduxRootState, TmpDispatch, select } from "Renderer/store"
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
import { addNewMessage, LoadMessagesById } from "App/messages/actions"
import {
  filteredThreadsSelector,
  getMessagesByThreadIdSelector,
  getMessagesResultMapStateByThreadIdSelector,
  getReceiverSelector,
  getReceiversSelector,
} from "App/messages/selectors"

const selector = select(({ contacts }) => ({
  getContact: contacts.getContact,
  getContactByPhoneNumber: contacts.getContactByPhoneNumber,
  attachContactList: contacts.contactList,
  attachContactFlatList: contacts.flatList,
  isContactCreated: contacts.isContactCreated,
}))

const mapStateToProps = (state: RootModel & ReduxRootState) => ({
  ...selector(state, {}),
  ...state.settings,
  threads: filteredThreadsSelector(state),
  receivers: getReceiversSelector(state),
  getReceiver: (contactId: string, phoneNumber: string) =>
    getReceiverSelector(contactId, phoneNumber)(state),
  getMessagesByThreadId: (threadId: string) =>
    getMessagesByThreadIdSelector(threadId)(state),
  getMessagesResultMapStateByThreadId: (threadId: string) =>
    getMessagesResultMapStateByThreadIdSelector(threadId)(state),
})

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  changeSearchValue: ({ target }: ChangeEvent<HTMLInputElement>) =>
    dispatch(changeSearchValue(target.value)),
  changeVisibilityFilter: (filter: VisibilityFilter) =>
    dispatch(changeVisibilityFilter(filter)),
  deleteThreads: (threadIds: string[]) => dispatch(deleteThreads(threadIds)),
  markAsRead: (threadIds: string[]) => dispatch(markThreadsAsRead(threadIds)),
  toggleReadStatus: (threadIds: string[]) =>
    dispatch(toggleThreadsReadStatus(threadIds)),
  loadMessagesByThreadId: (threadId: string) =>
    dispatch(LoadMessagesById(threadId)),
  addNewMessage: async (newMessage: NewMessage): Promise<Message | undefined> =>
    dispatch(addNewMessage(newMessage)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
