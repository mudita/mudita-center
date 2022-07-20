/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { InView } from "react-intersection-observer"
import {
  Col,
  Row,
  EmptyState,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { ContactSimpleListItemContactSelection } from "App/contacts/components/contact-simple-list-item-contact-selection"
import { ContactSimpleListItemPlaceholder } from "App/contacts/components/contact-simple-list-item-placeholder"
import { ContactSimpleListProps } from "App/contacts/components/contact-simple-list/contact-simple-list.interface"
import {
  GroupLabel,
  ContactGroup,
  ListWrapper,
} from "App/contacts/components/contact-simple-list/contact-simple-list.styled"
import { ContactSimpleListTestIdsEnum } from "App/contacts/components/contact-simple-list/contact-simple-list-test-ids.enum"
import { ContactSimpleItemListPhoneSelection } from "App/contacts/components/contact-simple-list-item-phone-selection"

const messages = defineMessages({
  emptyListTitle: { id: "module.contacts.emptyListTitle" },
  emptySearchDescription: { id: "module.contacts.emptySearchDescription" },
})

export const ContactSimpleList: FunctionComponent<ContactSimpleListProps> = ({
  contacts,
  onContactSelect,
  onPhoneNumberSelect,
}) => {
  return (
    <ListWrapper data-testid={ContactSimpleListTestIdsEnum.ListWrapper}>
      {contacts.length > 0 ? (
        contacts.map((key, contactsList) => (
          <ContactGroup key={key}>
            <GroupLabel data-testid={ContactSimpleListTestIdsEnum.GroupLabel}>
              <Col>{key ? key.toLocaleUpperCase() : "#"}</Col>
            </GroupLabel>
            {contactsList.map((contact) => (
              <InView key={key + contact.id}>
                {({ inView, ref }) =>
                  inView ? (
                    <Row
                      ref={ref}
                      disableHoverState={onPhoneNumberSelect !== undefined}
                    >
                      {onContactSelect && (
                        <ContactSimpleListItemContactSelection
                          contact={contact}
                          onContactSelect={onContactSelect}
                        />
                      )}
                      {onPhoneNumberSelect && (
                        <ContactSimpleItemListPhoneSelection
                          contact={contact}
                          onPhoneNumberSelect={onPhoneNumberSelect}
                        />
                      )}
                    </Row>
                  ) : (
                    <Row ref={ref}>
                      <ContactSimpleListItemPlaceholder contact={contact} />
                    </Row>
                  )
                }
              </InView>
            ))}
          </ContactGroup>
        ))
      ) : (
        <EmptyState
          title={messages.emptyListTitle}
          description={messages.emptySearchDescription}
          data-testid={ContactSimpleListTestIdsEnum.EmptyContent}
        />
      )}
    </ListWrapper>
  )
}
