/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChangeEvent } from "react"
import { connect } from "react-redux"
import Messages from "App/messages/components/messages/messages.component"
import {
  ReduxRootState,
  TmpDispatch,
  RootState,
} from "App/__deprecated__/renderer/store"
import { Thread, Message, NewMessage } from "App/messages/dto"
import { VisibilityFilter } from "App/messages/constants"
import {
  changeSearchValue,
  changeVisibilityFilter,
  hideDeleteModal,
  hideMessageDeleteModal,
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
import { getContactByPhoneNumberSelector } from "App/contacts/selectors/get-contact-by-phone-number.selector"
import { removeNotification } from "App/notification/actions"
import { getNotificationByResourceAndMethod } from "App/notification/selectors"
import {
  NotificationMethod,
  NotificationResourceType,
} from "App/notification/constants"
import { toggleThreadsReadStatus } from "App/messages/actions/toggle-threads-read-status.action"
import {
  deleteMessage,
  deleteThreads,
  markThreadsReadStatus,
  resendMessage,
} from "./actions"

const mapStateToProps = (state: RootState & ReduxRootState) => ({
  ...state.settings,
  threadsState: state.messages.threadsState,
  threads: filteredThreadsSelector(state),
  receivers: getReceiversSelector(state),
  threadDeletingState: state.messages.threadDeletingState,
  messageDeletingState: state.messages.messagesDeletingState,
  currentlyDeletingMessageId: state.messages.currentlyDeletingMessageId,
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
  templates: state.templates.data,
})

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  changeSearchValue: ({ target }: ChangeEvent<HTMLInputElement>) =>
    dispatch(changeSearchValue(target.value)),
  changeVisibilityFilter: (filter: VisibilityFilter) =>
    dispatch(changeVisibilityFilter(filter)),
  deleteThreads: async (threadIds: string[]): Promise<string[] | undefined> =>
    dispatch(deleteThreads(threadIds)),
  toggleReadStatus: (threads: Thread[]) =>
    dispatch(toggleThreadsReadStatus(threads)),
  markThreadsReadStatus: (threads: Thread[]) =>
    dispatch(markThreadsReadStatus(threads)),
  addNewMessage: async (newMessage: NewMessage): Promise<Message | undefined> =>
    dispatch(addNewMessage(newMessage)),
  deleteMessage: async (messageId: string): Promise<string> =>
    dispatch(deleteMessage(messageId)),
  removeLayoutNotification: (notificationId: string) =>
    dispatch(removeNotification(notificationId)),
  hideDeleteModal: () => dispatch(hideDeleteModal()),
  hideMessageDeleteModal: () => dispatch(hideMessageDeleteModal()),
  resendMessage: (messageId: string) => dispatch(resendMessage(messageId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
