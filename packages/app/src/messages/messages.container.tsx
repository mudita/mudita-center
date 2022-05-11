/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChangeEvent } from "react"
import { connect } from "react-redux"
import Messages from "App/messages/components/messages/messages.component"
import { ReduxRootState, TmpDispatch, RootState } from "Renderer/store"
import {
  Message,
  NewMessage,
  VisibilityFilter,
} from "App/messages/reducers/messages.interface"
import {
  changeSearchValue,
  changeVisibilityFilter,
  markThreadsAsRead,
  toggleThreadsReadStatus,
} from "App/messages/actions/base.action"
import { addNewMessage } from "App/messages/actions"
import {
  filteredThreadsSelector,
  getMessagesByThreadIdSelector,
  getReceiverSelector,
  getReceiversSelector,
} from "App/messages/selectors"
import { getContactSelector } from "App/contacts/selectors/get-contact.selector"
import { isContactCreatedByPhoneNumberSelector } from "App/contacts/selectors/is-contact-created-by-phone-number.selector"
import { contactListSelector } from "App/contacts/selectors/contact-list.selector"
import { flatListSelector } from "App/contacts/selectors/flat-list.selector"
import { getContactByPhoneNumberSelector } from "App/contacts/selectors/get-contact-by-phone-number.selector"
import { removeNotification } from "App/notification/actions"
import { getNotificationByResourceAndMethod } from "App/notification/selectors"
import {
  NotificationMethod,
  NotificationResourceType,
} from "App/notification/constants"
import { deleteThreads } from "App/messages/actions/delete-threads.action"

const mapStateToProps = (state: RootState & ReduxRootState) => ({
  ...state.settings,
  threadsState: state.messages.threadsState,
  threadsTotalCount: state.messages.threadsTotalCount,
  attachContactList: contactListSelector(state),
  attachContactFlatList: flatListSelector(state),
  threads: filteredThreadsSelector(state),
  receivers: getReceiversSelector(state),
  getContactByPhoneNumber: (phoneNumber: string) =>
    getContactByPhoneNumberSelector(phoneNumber)(state),
  isContactCreatedByPhoneNumber: (phoneNumber: string) =>
    isContactCreatedByPhoneNumberSelector(phoneNumber)(state),
  getContact: (id: string) => getContactSelector(id)(state),
  getReceiver: (phoneNumber: string) => getReceiverSelector(phoneNumber)(state),
  getMessagesByThreadId: (threadId: string) =>
    getMessagesByThreadIdSelector(threadId)(state),
  messageLayoutNotifications: getNotificationByResourceAndMethod(
    NotificationResourceType.Message,
    NotificationMethod.Layout
  )(state),
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
  addNewMessage: async (newMessage: NewMessage): Promise<Message | undefined> =>
    dispatch(addNewMessage(newMessage)),
  removeLayoutNotification: (notificationId: string) =>
    dispatch(removeNotification(notificationId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
