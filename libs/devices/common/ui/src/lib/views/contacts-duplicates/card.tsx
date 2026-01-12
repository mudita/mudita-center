/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Fragment, FunctionComponent } from "react"
import styled from "styled-components"
import { Badge, Button, Typography } from "app-theme/ui"
import { makeName, NameField } from "../contacts/name-field"
import { ButtonSize, ButtonType } from "app-theme/models"
import { defineMessages } from "app-localize/utils"
import { DuplicateContactsGroup } from "devices/common/models"

const messages = defineMessages({
  keepLabel: {
    id: "apiDevice.contacts.duplicates.card.keepLabel",
  },
  mergeLabel: {
    id: "apiDevice.contacts.duplicates.card.mergeLabel",
  },
  mergeButton: { id: "apiDevice.contacts.duplicates.card.mergeButton" },
})

interface Props extends DuplicateContactsGroup {
  onMerge: VoidFunction
}

export const Card: FunctionComponent<Props> = ({
  toKeep,
  toMerge,
  onMerge,
}) => {
  return (
    <Wrapper>
      {[toKeep, ...toMerge].map((contact) => (
        <Item key={contact.contactId}>
          {contact.contactId === toKeep.contactId ? (
            <Badge backgroundColor={"green"} message={messages.keepLabel.id} />
          ) : (
            <Badge backgroundColor={"grey5"} message={messages.mergeLabel.id} />
          )}
          <ContactData>
            <Typography.P1 lines={1} title={makeName(contact)}>
              <NameField contact={contact} />
            </Typography.P1>
            {contact.phoneNumbers?.map((phone) => (
              <Fragment key={phone.id}>
                <Typography.P4 lines={1} title={phone.phoneNumber}>
                  {phone.phoneNumber}
                </Typography.P4>
                <Typography.P4>•</Typography.P4>
                <Typography.P4>
                  {phone.phoneType.substring(0, 1).toUpperCase()}
                  {phone.phoneType.substring(1).toLowerCase()}
                </Typography.P4>
              </Fragment>
            ))}
            {contact.emailAddresses?.map((email) => (
              <Fragment key={email.id}>
                <Typography.P4 className={"email"}>
                  {email.emailAddress}
                </Typography.P4>
              </Fragment>
            ))}
          </ContactData>
        </Item>
      ))}
      <Button
        message={messages.mergeButton.id}
        type={ButtonType.Secondary}
        size={ButtonSize.Small}
        onClick={onMerge}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 2.4rem;
  background-color: ${({ theme }) => theme.app.color.white};
  border: solid 0.15rem ${({ theme }) => theme.app.color.grey5};
  border-radius: ${({ theme }) => theme.app.radius.md};
  display: grid;
  grid-template-columns: 24rem 24rem;
  grid-template-rows: auto;
  grid-auto-rows: auto;
  grid-column-gap: 3.2rem;
  grid-row-gap: 2.4rem;
  justify-items: start;
  align-items: start;

  button {
    grid-column-start: 1;
    grid-column-end: 3;
    justify-self: end;
  }
`

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  row-gap: 1.2rem;

  > div:first-child {
    align-self: flex-start;
    font-size: 1.2rem;
    line-height: 2.2rem;
  }
`

const ContactData = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  grid-template-rows: 2.6rem auto;
  grid-auto-rows: auto;
  row-gap: 0.4rem;
  grid-column-gap: 0.6rem;

  > p {
    white-space: pre;
    color: ${({ theme }) => theme.app.color.black};

    &:first-of-type {
      grid-column-start: 1;
      grid-column-end: 4;
    }

    &.email {
      grid-column-start: 1;
      grid-column-end: 4;
    }
  }
`
