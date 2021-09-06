/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChangeEvent } from "react"
import { connect } from "react-redux"
import { RootModel } from "Renderer/models/models"
import Messages from "App/messages/components/messages/messages.component"
import { select } from "Renderer/store"
import {
  Message,
  NewMessage,
  VisibilityFilter,
} from "App/messages/store/messages.interface"
import addMessage from "Renderer/requests/add-message.request"
import logger from "App/main/utils/logger"

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

const mapDispatchToProps = ({ messages }: any) => ({
  changeSearchValue: ({ target }: ChangeEvent<HTMLInputElement>) =>
    messages.changeSearchValue(target.value),
  changeVisibilityFilter: (filter: VisibilityFilter) =>
    messages.changeVisibilityFilter(filter),
  deleteThreads: (ids: string[]) => messages.deleteThreads(ids),
  markAsRead: (ids: string[]) => messages.markAsRead(ids),
  toggleReadStatus: (ids: string[]) => messages.toggleReadStatus(ids),
  loadMessagesByThreadId: (threadId: string) =>
    messages.loadMessagesByThreadId(threadId),
  addNewMessage: async (
    newMessage: NewMessage
  ): Promise<Message | undefined> => {
    const { data, error } = await addMessage(newMessage)
    if (error || !data) {
      logger.error(
        `Messages: editing new message throw error. Data: ${JSON.stringify(
          error
        )}`
      )
      return undefined
    } else {
      // messages.loadMessagesByThreadId(data.threadId)
      await messages.loadMockedMessagesByThreadId(data)
      return data
    }
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
