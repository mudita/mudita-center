/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import Messages from "App/messages/components/messages/messages.component"
import {
  ReduxRootState,
  TmpDispatch,
  RootState,
} from "App/__deprecated__/renderer/store"
import { Thread, NewMessage, Message } from "App/messages/dto"
import { VisibilityFilter } from "App/messages/constants"
import { changeVisibilityFilter } from "App/messages/actions/base.action"
import { addNewMessage } from "App/messages/actions"
import {
  filteredThreadsSelector,
  getActiveMessagesByThreadIdSelector,
  getReceiverSelector,
  getReceiversSelector,
  getThreadDraftMessageSelector,
} from "App/messages/selectors"
import { getContactSelector } from "App/contacts/selectors/get-contact.selector"
import { isContactCreatedByPhoneNumberIdSelector } from "App/contacts/selectors/is-contact-created-by-phone-number-id.selector"
import { getContactByPhoneNumberIdSelector } from "App/contacts/selectors/get-contact-by-phone-number-id.selector"
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
  updateMessage,
  selectAllItems,
  toggleItem,
  resetItems,
} from "./actions"
import { CreateMessageDataResponse } from "App/messages/services"
import { PayloadAction } from "@reduxjs/toolkit"
import { search, searchPreview } from "App/search/actions"
import { SearchParams } from "App/search/dto"

const mapStateToProps = (state: RootState & ReduxRootState) => ({
  error: state.messages.error,
  threadsState: state.messages.data.threadsState,
  threads: filteredThreadsSelector(state),
  receivers: getReceiversSelector(state),
  currentlyDeletingMessageId: state.messages.data.currentlyDeletingMessageId,
  getContactByPhoneNumberId: (phoneNumberId: string) =>
    getContactByPhoneNumberIdSelector(phoneNumberId)(state),
  isContactCreatedByPhoneNumberId: (phoneNumberId: string) =>
    isContactCreatedByPhoneNumberIdSelector(phoneNumberId)(state),
  getContact: (id: string) => getContactSelector(id)(state),
  getReceiver: (phoneNumberId: string) => {
    return getReceiverSelector(phoneNumberId)(state)
  },
  getActiveMessagesByThreadIdSelector: (threadId: string) =>
    getActiveMessagesByThreadIdSelector(threadId)(state),
  getThreadDraftMessageSelector: (threadId: string) =>
    getThreadDraftMessageSelector(threadId)(state),
  messageLayoutNotifications: getNotificationByResourceAndMethod(
    NotificationResourceType.Message,
    NotificationMethod.Layout
  )(state),
  templates: state.templates.data,
  selectedItems: state.messages.selectedItems,
  searchResult: state.messages.data.searchResult,
  searchPreviewResult: state.messages.data.searchPreviewResult,
  state: state.messages.state,
})

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  changeVisibilityFilter: (filter: VisibilityFilter) =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    dispatch(changeVisibilityFilter(filter)),
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  deleteThreads: async (threadIds: string[]): Promise<string[] | undefined> =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    dispatch(deleteThreads(threadIds)),
  toggleReadStatus: (threads: Thread[]) =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    dispatch(toggleThreadsReadStatus(threads)),
  markThreadsReadStatus: (threads: Thread[]) =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    dispatch(markThreadsReadStatus(threads)),
  addNewMessage: async (
    newMessage: NewMessage
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/require-await
  ): Promise<PayloadAction<CreateMessageDataResponse>> =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    dispatch(addNewMessage(newMessage)),
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  deleteMessage: async (messageId: string): Promise<string> =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    dispatch(deleteMessage(messageId)),
  removeLayoutNotification: (notificationId: string) =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    dispatch(removeNotification(notificationId)),
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  resendMessage: (messageId: string) => dispatch(resendMessage(messageId)),
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  updateMessage: (message: Message) => dispatch(updateMessage(message)),
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  selectAllItems: () => dispatch(selectAllItems()),
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  toggleItem: (threadId: string) => dispatch(toggleItem(threadId)),
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  resetItems: () => dispatch(resetItems()),
  searchMessages: (searchParams: SearchParams) =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    dispatch(search(searchParams)),
  searchMessagesForPreview: (searchParams: SearchParams) =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    dispatch(searchPreview(searchParams)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
