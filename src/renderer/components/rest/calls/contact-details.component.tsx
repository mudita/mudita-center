import React from "react"
import { MessageDescriptor } from "react-intl"
import Button from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { Type } from "Renderer/components/core/icon/icon.config"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import {
  ButtonWrapper,
  CallDescription,
  ContactName,
} from "Renderer/components/rest/calls/calls-table.styled"
import { CallDetails } from "Renderer/components/rest/calls/contact-details.helpers"
import {
  AdditionalInfo,
  CallWrapper,
  TypeHolder,
} from "Renderer/components/rest/calls/contact-details.styled"
import {
  AdditionalInfoItem,
  ContactDetailsWrapper,
  InfoItemName,
  Input,
} from "Renderer/components/rest/phone/contact-details.component"
import { Contact } from "Renderer/models/phone/phone.interface"
import { intl } from "Renderer/utils/intl"
import { noop } from "Renderer/utils/noop"

type MessageFromProps = Record<string, Record<string, MessageDescriptor>>
export type Details = Contact & CallDetails

interface ContactDetailsProps {
  calls: Details[]
  onClose: () => void
}

export const ContactDetails = ({ calls, onClose }: ContactDetailsProps) => {
  return (
    <ContactDetailsWrapper onClose={onClose} show>
      {calls.map((details, index) => (
        <CallWrapper key={index}>
          <ContactName displayStyle={TextDisplayStyle.SecondaryBoldHeading}>
            {details.icon}
            {details.firstName || details.lastName ? (
              <>
                {details.firstName} {details.lastName}
              </>
            ) : (
              <>{details.primaryPhoneNumber}</>
            )}
          </ContactName>
          <CallDescription displayStyle={TextDisplayStyle.SmallFadedText}>
            {details.description}
          </CallDescription>
          <ButtonWrapper>
            <Button
              displayStyle={DisplayStyle.Dropdown}
              label="Delete contact"
              onClick={noop}
              Icon={Type.Delete}
            />
            <Button
              displayStyle={DisplayStyle.Dropdown}
              label="Contact details"
              onClick={noop}
              Icon={Type.Contacts}
            />
          </ButtonWrapper>
          <>
            <AdditionalInfo>
              <AdditionalInfoItem>
                <InfoItemName
                  message={{
                    id: "view.name.phone.contacts.details.information",
                  }}
                />
                <Input value={details.primaryPhoneNumber} />
              </AdditionalInfoItem>
              <AdditionalInfoItem>
                <InfoItemName message={{ id: "view.name.generic.type" }} />
                <TypeHolder>
                  {details.icon}
                  <Input
                    value={intl.formatMessage(
                      (details.description as MessageFromProps).props.message
                    )}
                  />
                </TypeHolder>
              </AdditionalInfoItem>
            </AdditionalInfo>
            <AdditionalInfo large heading>
              <AdditionalInfoItem>
                <InfoItemName message={{ id: "view.name.generic.duration" }} />
              </AdditionalInfoItem>
              <AdditionalInfoItem>
                <InfoItemName message={{ id: "view.name.generic.date" }} />
              </AdditionalInfoItem>
            </AdditionalInfo>
            <AdditionalInfo large>
              <Input value={"0m 0s"} />
              <Input value={"Today"} />
            </AdditionalInfo>
          </>
        </CallWrapper>
      ))}
    </ContactDetailsWrapper>
  )
}
