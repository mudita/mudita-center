/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import {
  ModalButtons,
  ModalScrollableContent,
  ModalTitleIcon,
} from "../../interactive/modal"
import { IconType } from "generic-view/utils"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import styled from "styled-components"
import { ButtonPrimary } from "../../buttons/button-primary"
import { UnifiedContact } from "device/models"
import { CheckboxInput } from "../../interactive/input/checkbox-input"
import { useFormContext } from "react-hook-form"
import { Tooltip } from "../../interactive/tooltip/tooltip"

export const SELECTED_CONTACTS_FIELD = "contacts"

const messages = defineMessages({
  title: {
    id: "module.genericViews.importContacts.contactsListModal.title",
  },
  importButtonText: {
    id: "module.genericViews.importContacts.contactsListModal.importButtonText",
  },
})

const dummyData = Array.from({ length: 102 }, (_, index) => {
  const contact: UnifiedContact = {
    id: index.toString(),
    displayName: `Dummy Name ${index}`,
    phoneNumbers: Array.from({ length: Math.floor(Math.random() * 5) }, () => {
      return {
        value: "+48" + Math.random().toString().slice(2, 11).padEnd(8, "0"),
      }
    }),
  }
  return contact
})

export const ImportContactsList = () => {
  const { watch } = useFormContext()
  const selectedContacts = watch(SELECTED_CONTACTS_FIELD)

  return (
    <>
      <ModalTitleIcon data={{ type: IconType.ContactsBook }} />
      <h1>{intl.formatMessage(messages.title)}</h1>
      <Article>
        <ScrollableContent>
          {dummyData.map((item) => {
            return <ContactItem key={item.id} {...item} />
          })}
        </ScrollableContent>
      </Article>
      <CustomModalButtons>
        <ButtonPrimary
          config={{
            text: intl.formatMessage(messages.importButtonText, {
              count: selectedContacts?.length || 0,
            }),
            action: {
              type: "custom",
              callback: () => {
                console.log("IMPORT")
              },
            },
            disabled: !selectedContacts || selectedContacts.length === 0,
          }}
        />
      </CustomModalButtons>
    </>
  )
}

const ContactItem: React.FC<UnifiedContact> = ({
  id,
  displayName,
  phoneNumbers,
}) => {
  return (
    <ContactItemWrapper>
      <CheckboxInput
        config={{
          value: id,
          name: SELECTED_CONTACTS_FIELD,
        }}
      >
        <ContactLabelWrapper>
          <p>{displayName}</p>
          <StyledPhoneInfoWrapper>
            {phoneNumbers.length > 0 && <p>{phoneNumbers[0].value}</p>}
            {phoneNumbers.length > 1 && (
              <Tooltip>
                <Tooltip.Anchor>
                  <MoreNumbersButton>
                    {`+${phoneNumbers.length - 1}`}
                  </MoreNumbersButton>
                </Tooltip.Anchor>
                <Tooltip.Content>
                  <MoreNumbersList>
                    {phoneNumbers.slice(1).map((number) => (
                      <p key={number.value}>{number.value}</p>
                    ))}
                  </MoreNumbersList>
                </Tooltip.Content>
              </Tooltip>
            )}
          </StyledPhoneInfoWrapper>
        </ContactLabelWrapper>
      </CheckboxInput>
    </ContactItemWrapper>
  )
}

const ContactItemWrapper = styled.div`
  width: 100%;
  padding: 0 1.4rem;
`

const ContactLabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const StyledPhoneInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 2.3rem;
  grid-auto-flow: row;
  grid-column-gap: 0.5rem;
  align-items: center;

  && * {
    font-size: ${({ theme }) => theme.fontSize.labelText};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    line-height: ${({ theme }) => theme.lineHeight.labelText};
    letter-spacing: 0.04em;
    text-align: right;
    color: ${({ theme }) => theme.color.grey2};
  }
`

const Article = styled.article`
  width: 100%;
`

const CustomModalButtons = styled(ModalButtons).attrs({ $vertical: true })`
  grid-template-columns: auto;
`

const ScrollableContent = styled(ModalScrollableContent)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`

const MoreNumbersButton = styled.p`
  width: 2.3rem;
  height: 2.3rem;
  border-radius: ${({ theme }) => theme.radius.xs};
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.grey5};
  }
`

const MoreNumbersList = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${({ theme }) => theme.space.sm};
  background-color: ${({ theme }) => theme.color.grey4};
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: 0 1rem 5rem 0 rgba(0, 0, 0, 0.08);

  p {
    color: ${({ theme }) => theme.color.grey1};
    text-align: left;
  }
`
