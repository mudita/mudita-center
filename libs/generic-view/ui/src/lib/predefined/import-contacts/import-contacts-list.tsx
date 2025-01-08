/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useMemo } from "react"
import { defineMessages } from "react-intl"
import { Modal } from "../../interactive/modal"
import { IconType, useViewFormContext } from "generic-view/utils"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import styled from "styled-components"
import { ButtonPrimary } from "../../buttons/button-primary"
import { UnifiedContact } from "device/models"
import { Tooltip } from "../../interactive/tooltip/tooltip"
import { getDisplayName, importContactsSelector } from "generic-view/store"
import { useSelector } from "react-redux"
import { Divider } from "../../helpers/divider"
import { Form } from "../../interactive/form/form"
import { ButtonAction } from "generic-view/models"
import { Typography } from "../../typography"

export const SELECTED_CONTACTS_FIELD = "selected-contacts"

const messages = defineMessages({
  title: {
    id: "module.genericViews.importContacts.contactsListModal.title",
  },
  importButtonText: {
    id: "module.genericViews.importContacts.contactsListModal.importButtonText",
  },
  selectAllButton: {
    id: "module.genericViews.importContacts.contactsListModal.selectAllButton",
  },
  selectedContactsStats: {
    id: "module.genericViews.importContacts.contactsListModal.selectedContactsStats",
  },
  noResults: {
    id: "module.genericViews.importContacts.contactsListModal.noResults",
  },
})

interface Props {
  nextAction: ButtonAction
}

export const ImportContactsList: FunctionComponent<Props> = ({
  nextAction,
}) => {
  const getFormContext = useViewFormContext()
  const { watch } = getFormContext()
  const contacts = useSelector(importContactsSelector)
  const searchPhrase = watch("search")
  const selectedContacts = watch(SELECTED_CONTACTS_FIELD) || []

  const filteredContacts = useMemo(() => {
    return contacts.filter(({ firstName, middleName, lastName }) => {
      if (!searchPhrase) {
        return true
      }
      return getDisplayName({ firstName, middleName, lastName })
        .toLowerCase()
        .includes(searchPhrase.toLowerCase())
    })
  }, [contacts, searchPhrase])

  return (
    <>
      <Modal.TitleIcon config={{ type: IconType.ContactsBook }} />
      <Modal.Title>{intl.formatMessage(messages.title)}</Modal.Title>
      <Form.SearchInput
        config={{
          label: "Search contacts",
          name: "search",
        }}
      />
      <AllContactsSelector>
        <AllCheckbox
          config={{
            name: SELECTED_CONTACTS_FIELD,
            multipleValues: (contacts || []).map(({ id }) => id),
            label: intl.formatMessage(messages.selectAllButton),
          }}
        />
        <SelectedInfo>
          {intl.formatMessage(messages.selectedContactsStats, {
            selectedCount: selectedContacts?.length || 0,
            totalCount: contacts?.length || 0,
          })}
        </SelectedInfo>
        <CustomDivider />
      </AllContactsSelector>
      <Article>
        {searchPhrase && filteredContacts.length === 0 && (
          <p>{intl.formatMessage(messages.noResults)}</p>
        )}
        <ScrollableContent>
          {filteredContacts.map((item) => {
            return <ContactItem key={item.id} {...item} />
          })}
        </ScrollableContent>
      </Article>
      <Modal.Buttons config={{ vertical: true }}>
        <ButtonPrimary
          config={{
            text: intl.formatMessage(messages.importButtonText, {
              count: selectedContacts?.length || 0,
            }),
            actions: [nextAction],
            disabled: !selectedContacts || selectedContacts.length === 0,
          }}
        />
      </Modal.Buttons>
      <Modal.SizeController config={{ size: "medium" }} />
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
      <Form.CheckboxInput
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
              <Tooltip
                config={{
                  offset: {
                    x: 3,
                    y: 11,
                  },
                }}
              >
                <Tooltip.Anchor>
                  <MoreNumbersButton>
                    {`+${phoneNumbers.length - 1}`}
                  </MoreNumbersButton>
                </Tooltip.Anchor>
                <Tooltip.Content>
                  {phoneNumbers.slice(1).map((number) => (
                    <Typography.P5 key={number.value}>
                      {number.value}
                    </Typography.P5>
                  ))}
                </Tooltip.Content>
              </Tooltip>
            )}
          </StyledPhoneInfoWrapper>
        </ContactLabelWrapper>
      </Form.CheckboxInput>
    </ContactItemWrapper>
  )
}

const ContactItemWrapper = styled.div`
  width: 100%;
  padding: 0.4rem 1.4rem;

  > *,
  label {
    width: 100%;
  }
`

const ContactLabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: ${({ theme }) => theme.space.md};

  && p {
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    white-space: nowrap;
    max-width: 17.4rem;
  }
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
  margin-top: calc(var(--modal-padding) * -1);
  min-height: 30.6rem;

  && > p {
    margin-top: 6.7rem;
  }
`

const ScrollableContent = styled(Modal.ScrollableContent)`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
  padding-top: var(--modal-padding);
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

const CustomDivider = styled(Divider)`
  border-color: ${({ theme }) => theme.color.grey3};
  margin: 1.4rem calc(var(--modal-padding) * -1) 0;
  width: calc(100% + var(--modal-padding) * 2);
`

const AllCheckbox = styled(Form.CheckboxInput)`
  min-height: 2.4rem;
  margin-left: 1.4rem;
  flex: 1;
`

const SelectedInfo = styled.p`
  padding: 0 1.4rem 0 0;
  font-size: ${({ theme }) => theme.fontSize.labelText};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  line-height: ${({ theme }) => theme.lineHeight.labelText};
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.color.grey1};
  text-align: right;
`

const AllContactsSelector = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
