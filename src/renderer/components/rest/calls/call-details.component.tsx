import moment from "moment"
import React from "react"
import { useHistory } from "react-router-dom"
import { URL_MAIN } from "Renderer/constants/urls"
import Button from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import Icon, { IconSize } from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
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
import { phoneActions } from "Renderer/components/rest/phone/contact-details.component"
import formatDuration from "Renderer/utils/format-duration"
import { intl } from "Renderer/utils/intl"
import { defineMessages } from "react-intl"
import { isToday } from "Renderer/utils/is-today"
import { noop } from "Renderer/utils/noop"
import {
  AdditionalInfoItem,
  ContactDetailsWrapper,
  InfoItemName,
  Input,
} from "Renderer/components/rest/phone/contact-details.styled"
import createRouterPath from "Renderer/utils/create-router-path"

const messages = defineMessages({
  today: { id: "view.name.phone.calls.today" },
  duration: { id: "view.name.phone.calls.duration" },
  date: { id: "view.name.phone.calls.date" },
  type: { id: "view.name.phone.calls.type" },
  information: { id: "view.name.phone.contacts.details.information" },
  deleteCallLabel: { id: "view.name.phone.contacts.details.deleteCallLabel" },
  contactCallLabel: { id: "view.name.phone.contacts.details.contactCallLabel" },
  newContactCallLabel: {
    id: "view.name.phone.contacts.details.newContactCallLabel",
  },
})

interface ContactDetailsProps {
  calls: Details[]
  onClose: () => void
  isTopicThreadOpened: (phoneNumber: string) => boolean
  isContactCreated: (phoneNumber: string) => boolean
  onDeleteClick: (id: string) => void
}

export const CallDetails = ({
  calls,
  onClose,
  onDeleteClick,
  isTopicThreadOpened,
  isContactCreated,
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

        return (
          <CallWrapper key={index}>
            <ContactName displayStyle={TextDisplayStyle.SecondaryBoldHeading}>
              <NameIcon type={details.icon} size={IconSize.Big} />
              {details.caller.firstName || details.caller.lastName ? (
                <>
                  {details.caller.firstName} {details.caller.lastName}
                </>
              ) : (
                <>{details.caller.phoneNumber}</>
              )}
            </ContactName>
            <CallDescription
              displayStyle={TextDisplayStyle.SmallFadedText}
              message={details.description}
            />
            <ButtonWrapper>
              <Button
                displayStyle={DisplayStyle.Dropdown}
                label={intl.formatMessage(messages.deleteCallLabel)}
                onClick={emitDeleteClick}
                Icon={Type.Delete}
              />
              {contactCreated ? (
                <Button
                  displayStyle={DisplayStyle.Dropdown}
                  label={intl.formatMessage(messages.contactCallLabel)}
                  onClick={redirectToContactsPage}
                  Icon={Type.Contact}
                />
              ) : (
                <Button
                  displayStyle={DisplayStyle.Dropdown}
                  label={intl.formatMessage(messages.newContactCallLabel)}
                  onClick={redirectToContactsPage}
                  Icon={Type.NewContact}
                />
              )}
            </ButtonWrapper>
            <>
              <AdditionalInfo>
                {details.caller.phoneNumber && (
                  <AdditionalInfoItem>
                    <InfoItemName message={messages.information} />
                    <Input
                      value={details.caller.phoneNumber}
                      trailingIcons={phoneActions(
                        details.caller.phoneNumber,
                        isTopicThreadOpened(details.caller.phoneNumber),
                        noop,
                        redirectToMessagesPage
                      )}
                    />
                  </AdditionalInfoItem>
                )}
                <AdditionalInfoItem>
                  <InfoItemName message={messages.type} />
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
                  <InfoItemName message={messages.duration} />
                </AdditionalInfoItem>
                <AdditionalInfoItem>
                  <InfoItemName message={messages.date} />
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
