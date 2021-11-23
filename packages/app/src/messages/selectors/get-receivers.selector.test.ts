/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState, RootState } from "Renderer/store"
import { initialState, messagesReducer, Thread } from "App/messages/reducers"
import { initialState as contactsInitialState } from "App/contacts/store/contacts"
import { getReceiversSelector } from "App/messages/selectors/get-receivers.selector"
import { Contact } from "App/contacts/store/contacts.type"

describe("`getReceiversSelector` selector", () => {
  test("when initial state is set selector returns value properly", () => {
    const state = {
      messages: messagesReducer(initialState, {} as any),
      contacts: contactsInitialState,
    } as RootState & ReduxRootState
    expect(getReceiversSelector(state)).toEqual([])
  })

  test("when messages contains some threads selector returns receiver list properly ", () => {
    const thread: Thread = {
      id: "1",
      phoneNumber: "+48 755 853 216",
      lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
      messageSnippet:
        "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
      unread: true,
    }

    const state = {
      messages: messagesReducer(
        {
          ...initialState,
          threadMap: {
            [thread.id]: thread,
          },
        },
        {} as any
      ),
      contacts: contactsInitialState,
    } as RootState & ReduxRootState
    expect(getReceiversSelector(state)).toEqual([
      {
        identification: 0,
        phoneNumber: "+48 755 853 216",
      },
    ])
  })

  test("when messages contains thread where exist relation with contact selector returns receiver list properly ", () => {
    const thread: Thread = {
      id: "1",
      phoneNumber: "+48 755 853 216",
      lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
      messageSnippet:
        "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
      unread: true,
    }

    const contacts: Contact[] = [
      {
        id: "0",
        firstName: "Sławomir",
        lastName: "Borewicz",
        primaryPhoneNumber: "+48 755 853 216",
        secondaryPhoneNumber: "",
        email: "example@mudita.com",
        note: "sapiente rem dignissimos sunt",
        ice: false,
        favourite: false,
        blocked: false,
        firstAddressLine: "Malczewskiego 3, Warszawa",
        secondAddressLine: "",
      },
    ]

    const state = {
      messages: messagesReducer(
        {
          ...initialState,
          threadMap: {
            [thread.id]: thread,
          },
        },
        {} as any
      ),
      contacts: {
        ...contactsInitialState,
        db: {
          [contacts[0].id]: contacts[0],
        },
      },
    } as RootState & ReduxRootState
    expect(getReceiversSelector(state)).toEqual([
      {
        firstName: "Sławomir",
        identification: 0,
        lastName: "Borewicz",
        phoneNumber: "+48 755 853 216",
      },
    ])
  })

  test("when contacts have a phone number receiver is returned", () => {
    const contacts: Contact[] = [
      {
        id: "6e3810c8-c917",
        firstName: "Oswald",
        lastName: "Bednar",
        primaryPhoneNumber: "+48 755 853 216",
      },
    ]

    const state = {
      messages: messagesReducer(initialState, {} as any),
      contacts: {
        ...contactsInitialState,
        db: {
          [contacts[0].id]: contacts[0],
        },
      },
    } as RootState & ReduxRootState
    expect(getReceiversSelector(state)).toEqual([
      {
        firstName: "Oswald",
        identification: 0,
        lastName: "Bednar",
        phoneNumber: "+48 755 853 216",
      },
    ])
  })

  test("when contacts doesn't have a phone number receiver isn't returned", () => {
    const contacts: Contact[] = [
      {
        id: "6e3810c8-c917",
        firstName: "Oswald",
        lastName: "Bednar",
      },
    ]

    const state = {
      messages: messagesReducer(initialState, {} as any),
      contacts: {
        ...contactsInitialState,
        db: {
          [contacts[0].id]: contacts[0],
        },
      },
    } as RootState & ReduxRootState
    expect(getReceiversSelector(state)).toEqual([])
  })
})
