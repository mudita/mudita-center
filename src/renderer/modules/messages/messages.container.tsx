import { ChangeEvent } from "react"
import { connect } from "react-redux"
import {
  Topic,
  VisibilityFilter,
} from "Renderer/models/messages/messages.interface"
import { RootModel } from "Renderer/models/models"
import { Contact } from "Renderer/models/phone/phone.interface"
import Messages from "./messages.component"
import { select } from "Renderer/store"

const selector = select(({ messages }) => ({
  list: messages.filteredList,
}))

const getContactsAsMap = (contacts: Contact[]) => {
  return contacts.reduce((acc: Record<string, Contact>, item: Contact) => {
    return {
      ...acc,
      [item.id]: item,
    }
  }, {})
}

const getMessagesWithAuthorsSelector = (state: any) => {
  const {
    messages: { topics },
    phone: { contacts: baseContacts },
  } = state

  const contacts = getContactsAsMap(baseContacts)

  return topics.map((topic: Topic) => {
    const { id } = topic.caller
    if (id in contacts) {
      return {
        ...topic,
        fetched: true,
        caller: contacts[id],
      }
    }

    return topic
  })
}

const mapStateToProps = (state: RootModel) => ({
  ...selector(state, {}),
  fullMessages: getMessagesWithAuthorsSelector(state),
})

const mapDispatchToProps = (dispatch: any) => ({
  changeSearchValue: ({ target }: ChangeEvent<HTMLInputElement>) =>
    dispatch.messages.changeSearchValue(target.value),
  changeVisibilityFilter: (filter: VisibilityFilter) =>
    dispatch.messages.changeVisibilityFilter(filter),
  deleteConversation: (ids: string[]) =>
    dispatch.messages.deleteConversation(ids),
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
