/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useMemo } from "react"
import { HighlightText, TextInput, Typography } from "app-theme/ui"
import { TextInputVariant } from "app-theme/models"
import { useFormContext } from "react-hook-form"
import { ContactsNormalized } from "devices/common/models"
import styled from "styled-components"
import { makeName } from "./name-field"
import { defineMessages, formatMessage } from "app-localize/utils"

const messages = defineMessages({
  placeholder: {
    id: "apiDevice.contacts.panel.searchPlaceholder",
  },
  searchEmpty: {
    id: "apiDevice.contacts.panel.searchEmpty",
  },
})

interface Props {
  normalizedContacts: ContactsNormalized
  dataIds: string[]
  onSelectContact?: (contactId: string) => void
}

export const Search: FunctionComponent<Props> = (props) => {
  const form = useFormContext()

  return (
    <TextInput
      variant={TextInputVariant.Outlined}
      type={"search"}
      placeholder={formatMessage(messages.placeholder)}
      disableErrors
      dropdown={<Dropdown {...props} />}
      {...form.register("searchQuery")}
    />
  )
}

const Dropdown: FunctionComponent<Props> = ({
  normalizedContacts,
  dataIds,
  onSelectContact,
}) => {
  const form = useFormContext()
  const searchQuery = form.watch("searchQuery")

  const results = useMemo(() => {
    if (!searchQuery) return []

    return dataIds
      .map((id) => {
        const contact = normalizedContacts[id]
        const query = searchQuery.toLowerCase()
        const words = query.split(" ").filter(Boolean) as string[]

        const nameMatch = words.every((word) => {
          return [
            contact.displayName1,
            contact.displayName2,
            contact.displayName3,
            contact.displayName4,
          ].some((namePart) => namePart?.toLowerCase().startsWith(word))
        })

        const phone = contact.phoneNumbers?.find(({ phoneNumber }) => {
          return words.every((word) => phoneNumber.toLowerCase().includes(word))
        })
        if (nameMatch || phone) {
          const line1 = makeName(contact)
          const line2 = phone?.phoneNumber || contact.phoneNumbers?.[0]?.phoneNumber
          return {
            id: contact.contactId,
            line1,
            line2: line1 !== line2 ? line2 : undefined,
          }
        }
        return null
      })
      .filter(Boolean) as {
      id: string
      line1: string
      line2?: string
    }[]
  }, [normalizedContacts, dataIds, searchQuery])

  return (
    <DropdownWrapper>
      {searchQuery.length > 0 && results.length === 0 ? (
        <TextInput.Dropdown.EmptyState
          text={formatMessage(messages.searchEmpty)}
        />
      ) : (
        results.map(({ id, line1, line2 }) => {
          const onClick = () => {
            onSelectContact?.(id)
          }
          return (
            <DropdownItem
              key={id}
              query={searchQuery}
              name={line1}
              phone={line2}
              onClick={onClick}
            />
          )
        })
      )}
    </DropdownWrapper>
  )
}

const DropdownItem: FunctionComponent<{
  query?: string
  name?: string
  phone?: string
  onClick?: VoidFunction
}> = ({ query, name, phone, onClick }) => {
  return (
    <ItemWrapper onClick={onClick}>
      {name && (
        <Typography.P3 color={"black"}>
          <HighlightText
            text={name}
            phrase={query}
            mode={phone ? "word-start" : "anywhere"}
            scope={"all"}
            phraseWordsSeparated={true}
          />
        </Typography.P3>
      )}
      {phone && (
        <Typography.P4 color={"black"}>
          <HighlightText
            text={phone}
            phrase={query}
            mode={"anywhere"}
            scope={"all"}
            phraseWordsSeparated={true}
          />
        </Typography.P4>
      )}
    </ItemWrapper>
  )
}

const DropdownWrapper = styled(TextInput.Dropdown)`
  max-height: 24.2rem;
  overflow-y: auto;
`

const ItemWrapper = styled(TextInput.Dropdown.Item)`
  display: flex;
  flex-direction: column;
  padding: 0.8rem 1.6rem;
  justify-content: center;
  min-height: 6rem;
  height: 6rem;
`
