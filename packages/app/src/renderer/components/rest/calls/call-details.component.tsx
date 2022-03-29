/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import moment from "moment"
import React from "react"
import { useHistory } from "react-router-dom"
import { URL_MAIN } from "Renderer/constants/urls"
import Button from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import Icon, { IconSize } from "Renderer/components/core/icon/icon.component"
import { CallsTableTestIds } from "Renderer/components/rest/calls/calls-table.enum"
import {
  CallDescription,
  ContactName,
  NameIcon,
} from "Renderer/components/rest/calls/calls-table.styled"
import {
  AdditionalInfo,
  ButtonWrapper,
  CallWrapper,
} from "Renderer/components/rest/calls/call-details.styled"
import { Details } from "Renderer/components/rest/calls/call-details.types"
import { phoneActions } from "App/contacts/components/contact-details/contact-details.component"
import formatDuration from "Renderer/utils/format-duration"
import { intl } from "Renderer/utils/intl"
import { defineMessages } from "react-intl"
import { isToday } from "Renderer/utils/is-today"
import { noop } from "Renderer/utils/noop"
import {
  AdditionalInfoItem,
  ContactDetailsWrapper,
  Input,
} from "App/contacts/components/contact-details/contact-details.styled"
import createRouterPath from "Renderer/utils/create-router-path"
import getPrettyCaller from "Renderer/models/calls/get-pretty-caller"
import { Contact } from "App/contacts/reducers/contacts.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { IconType } from "Renderer/components/core/icon/icon-type"

const messages = defineMessages({
  today: { id: "module.phone.callsToday" },
  duration: { id: "module.phone.callsDuration" },
  date: { id: "module.phone.callsDate" },
  type: { id: "module.phone.callsType" },
  information: { id: "module.contacts.information" },
  deleteCallLabel: { id: "module.contacts.deleteCallLabel" },
  contactCallLabel: { id: "module.contacts.detailsContactCallLabel" },
  newContactCallLabel: {
    id: "module.contacts.newContactCallLabel",
  },
})

interface ContactDetailsProps {
  calls: Details[]
  onClose: () => void
  isThreadOpened: (phoneNumber: string) => boolean
  isContactCreated: (phoneNumber: string) => boolean
  getContact: (contactId: string) => Contact | undefined
  onDeleteClick: (id: string) => void
}

export const CallDetails = ({
  calls,
  onClose,
  onDeleteClick,
  isThreadOpened,
  isContactCreated,
  getContact,
}: ContactDetailsProps) => {
  const history = useHistory()
  return (
    <ContactDetailsWrapper
      onClose={onClose}
      show
      data-testid={CallsTableTestIds.CallDetails}
    >
      {calls.map((details, index) => {
        const timesMissed = details?.timesMissed
          ? ` (${details.timesMissed})`
          : ""
        const callDate = isToday(details?.date)
          ? `${intl.formatMessage(messages.today)}, ${moment(
              details.date
            ).format("h:mm")}`
          : moment(details.date).format("ll")
        const redirectToMessagesPage = (phoneNumber: string) => {
          history.push(
            createRouterPath(URL_MAIN.messages, {
              phoneNumber,
            })
          )
        }
        const redirectToContactsPage = () => {
          history.push(
            createRouterPath(URL_MAIN.contacts, {
              phoneNumber: details.caller.phoneNumber,
            })
          )
        }

        const contactCreated = isContactCreated(details.caller.phoneNumber)

        const emitDeleteClick = () => onDeleteClick(details.id)
        const contact = getContact(details.caller.id)

        return (
          <CallWrapper key={index}>
            <ContactName>
              <NameIcon type={details.icon} size={IconSize.Big} />
              {getPrettyCaller(contact, details.caller.phoneNumber)}
            </ContactName>
            <CallDescription message={details.description} />
            <ButtonWrapper>
              <Button
                displayStyle={DisplayStyle.Dropdown}
                labelMessage={messages.deleteCallLabel}
                onClick={emitDeleteClick}
                Icon={IconType.Delete}
              />
              {contactCreated ? (
                <Button
                  displayStyle={DisplayStyle.Dropdown}
                  labelMessage={messages.contactCallLabel}
                  onClick={redirectToContactsPage}
                  Icon={IconType.Contact}
                />
              ) : (
                <Button
                  displayStyle={DisplayStyle.Dropdown}
                  labelMessage={messages.newContactCallLabel}
                  onClick={redirectToContactsPage}
                  Icon={IconType.NewContact}
                />
              )}
            </ButtonWrapper>
            <>
              <AdditionalInfo>
                {details.caller.phoneNumber && (
                  <AdditionalInfoItem>
                    <Text
                      displayStyle={TextDisplayStyle.Title}
                      color="secondary"
                      message={messages.information}
                    />
                    <Input
                      value={details.caller.phoneNumber}
                      trailingIcons={phoneActions(
                        details.caller.phoneNumber,
                        !isThreadOpened(details.caller.phoneNumber),
                        noop,
                        redirectToMessagesPage
                      )}
                    />
                  </AdditionalInfoItem>
                )}
                <AdditionalInfoItem>
                  <Text
                    displayStyle={TextDisplayStyle.Title}
                    color="secondary"
                    message={messages.type}
                  />
                  <Input
                    leadingIcons={[
                      <Icon
                        key={`icon-${details.icon}`}
                        type={details.icon}
                        width={2.4}
                      />,
                    ]}
                    value={`${intl.formatMessage(
                      details.description
                    )}${timesMissed}`}
                  />
                </AdditionalInfoItem>
              </AdditionalInfo>
              <AdditionalInfo large heading>
                <AdditionalInfoItem>
                  <Text
                    displayStyle={TextDisplayStyle.Title}
                    color="secondary"
                    message={messages.duration}
                  />
                </AdditionalInfoItem>
                <AdditionalInfoItem>
                  <Text
                    displayStyle={TextDisplayStyle.Title}
                    color="secondary"
                    message={messages.date}
                  />
                </AdditionalInfoItem>
              </AdditionalInfo>
              <AdditionalInfo large>
                <AdditionalInfoItem>
                  <Input value={formatDuration(details.duration)} />
                </AdditionalInfoItem>
                <AdditionalInfoItem>
                  <Input value={callDate} />
                </AdditionalInfoItem>
              </AdditionalInfo>
            </>
          </CallWrapper>
        )
      })}
    </ContactDetailsWrapper>
  )
}
