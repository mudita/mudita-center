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

export const SELECTED_CONTACTS_FIELD = "contacts"

const messages = defineMessages({
  title: {
    id: "module.genericViews.importContacts.contactsListModal.title",
  },
  importButtonText: {
    id: "module.genericViews.importContacts.contactsListModal.importButtonText",
  },
})

const dummyData = new Array(102).fill(1).map((_, index) => {
  const contact: UnifiedContact = {
    id: index.toString(),
    displayName: `Dummy Name ${index}`,
    phoneNumbers: new Array(index).fill(10).map(() => {
      return { value: "+48123123123" }
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
            {
              <div className="additionalNumbers">
                {phoneNumbers.length > 1 ? `+${phoneNumbers.length - 1}` : ""}
              </div>
            }
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
  display: flex;
  flex-direction: row;
  gap: 0.5rem;

  & > .additionalNumbers {
    width: 2.3rem;
  }
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
