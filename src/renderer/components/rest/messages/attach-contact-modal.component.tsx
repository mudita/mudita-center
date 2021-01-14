import React, { Ref, useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Modal from "Renderer/components/core/modal/modal.component"
import { intl } from "Renderer/utils/intl"
import { Contact, ContactCategory } from "App/contacts/store/contacts.typings"
import {
  Col,
  EmptyState,
  Group,
  Labels,
  Row,
  TextPlaceholder,
} from "Renderer/components/core/table/table.component"
import { createFullName } from "App/contacts/store/contacts.helpers"
import { ContactListTestIdsEnum } from "App/contacts/components/contact-list/contact-list-test-ids.enum"
import Avatar, {
  AvatarSize,
} from "Renderer/components/core/avatar/avatar.component"
import { InView } from "react-intersection-observer"
import { AvatarPlaceholder } from "App/contacts/components/contact-list/contact-list.component"
import styled from "styled-components"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import ContactInputSearch from "App/contacts/components/contact-input-search/contact-input-search.component"
import { defineMessages } from "react-intl"
import { HighlightContactList } from "App/contacts/components/highlight-contact-list/highlight-contact-list.component"
import Badge from "Renderer/components/core/badge/badge.component"

export const messages = defineMessages({
  title: { id: "view.name.messages.attachModal.title" },
  unnamedContact: { id: "view.name.phone.contacts.list.unnamedContact" },
})

interface Props {
  contactList: ContactCategory[]
  contactFlatList: Contact[]
}

const GroupLabel = styled(Labels)`
  background-color: ${backgroundColor("row")};
`
const BlockedIcon = styled(Icon).attrs(() => ({
  type: Type.Blocked,
}))`
  margin-left: 1.6rem;
`

const ClickableCol = styled(Col)`
  height: 100%;
  margin-left: 2rem;
`
const ContactGroup = styled(Group)`
  --columnsTemplate: 1fr 1fr 1fr 1fr 0.5fr;
  --columnsGap: auto;
  --labelBackground: ${backgroundColor("row")};
`

const InitialsAvatar = styled(Avatar)`
  margin-right: 1.2rem;
`

const ListWrapper = styled(HighlightContactList)`
  height: 50rem;
  overflow: scroll;
`

const EmptyStateContainer = styled(EmptyState)`
  padding-top: 3rem;
`

const AttachContactModal: FunctionComponent<Props> = ({
  contactList,
  contactFlatList,
}) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  return (
    <Modal title={intl.formatMessage(messages.title)} closeButton={false}>
      <ContactInputSearch
        contacts={contactFlatList}
        onContactSelect={setSelectedContact}
      />
      <ListWrapper
        contactList={contactList}
        selectedContact={selectedContact}
        clearSelectedContact={setSelectedContact}
      >
        {contactList.length !== 0 &&
          contactList.map(({ category, contacts }) => {
            return (
              <ContactGroup key={category}>
                <GroupLabel>
                  <Col>{category}</Col>
                </GroupLabel>
                {contacts.map((contact) => {
                  const fullName = createFullName(contact)
                  const phoneNumber =
                    contact.primaryPhoneNumber || contact.secondaryPhoneNumber

                  const interactiveRow = (ref: Ref<HTMLDivElement>) => (
                    <Row active={contact === selectedContact} ref={ref}>
                      <ClickableCol
                        data-testid={ContactListTestIdsEnum.ContactRow}
                      >
                        <InitialsAvatar
                          user={contact}
                          size={AvatarSize.Small}
                        />
                        {fullName ||
                          intl.formatMessage(messages.unnamedContact)}
                        {contact.blocked && (
                          <BlockedIcon width={2} height={2} />
                        )}
                      </ClickableCol>
                      <Col>{contact.firstAddressLine}</Col>
                      <Col>{contact.email}</Col>
                      <Col>{contact.primaryPhoneNumber}</Col>
                      <Col>
                        {contact.primaryPhoneNumber &&
                          contact.secondaryPhoneNumber && <Badge>+1</Badge>}
                      </Col>
                    </Row>
                  )

                  const placeholderRow = (ref: Ref<HTMLDivElement>) => {
                    return (
                      <Row ref={ref}>
                        <Col />
                        <Col>
                          <AvatarPlaceholder />
                          <TextPlaceholder charsCount={fullName.length} />
                        </Col>
                        <Col>
                          {phoneNumber && (
                            <TextPlaceholder charsCount={phoneNumber.length} />
                          )}
                        </Col>
                      </Row>
                    )
                  }

                  return (
                    <InView key={category + contact.id}>
                      {({ inView, ref }) =>
                        inView ? interactiveRow(ref) : placeholderRow(ref)
                      }
                    </InView>
                  )
                })}
              </ContactGroup>
            )
          })}
        {contactList.length === 0 && (
          <EmptyStateContainer
            title={{ id: "view.name.messages.attachModal.emptyList.title" }}
            description={{
              id: "view.name.messages.attachModal.emptyList.description",
            }}
          />
        )}
      </ListWrapper>
    </Modal>
  )
}

export default AttachContactModal
