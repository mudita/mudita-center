import moment from "moment"
import React from "react"
import Button from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { CallsTableTestIds } from "Renderer/components/rest/calls/calls-table.enum"
import {
  CallDescription,
  ContactName,
} from "Renderer/components/rest/calls/calls-table.styled"
import {
  AdditionalInfo,
  ButtonWrapper,
  CallWrapper,
  IconHolder,
  IconHolderPosition,
} from "Renderer/components/rest/calls/contact-details.styled"
import { Details } from "Renderer/components/rest/calls/contact-details.types"
import {
  AdditionalInfoItem,
  ContactDetailsWrapper,
  InfoItemName,
  Input,
} from "Renderer/components/rest/phone/contact-details.component"
import formatDuration from "Renderer/utils/format-duration"
import { intl } from "Renderer/utils/intl"
import { isToday } from "Renderer/utils/is-today"
import { noop } from "Renderer/utils/noop"

interface ContactDetailsProps {
  calls: Details[]
  onClose: () => void
}

export const ContactDetails = ({ calls, onClose }: ContactDetailsProps) => {
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
          ? intl.formatMessage({ id: "view.generic.today" })
          : moment(details.date).format("ll")

        return (
          <CallWrapper key={index}>
            <ContactName displayStyle={TextDisplayStyle.SecondaryBoldHeading}>
              <Icon type={details.icon} width="auto" />
              {details.caller.firstName || details.caller.lastName ? (
                <>
                  {details.caller.firstName} {details.caller.lastName}
                </>
              ) : (
                <>{details.caller.primaryPhoneNumber}</>
              )}
            </ContactName>
            <CallDescription
              displayStyle={TextDisplayStyle.SmallFadedText}
              message={{ id: details.description }}
            />
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
                  <IconHolder iconPosition={IconHolderPosition.Right}>
                    <Input value={details.caller.primaryPhoneNumber} />
                    <ButtonWrapper small>
                      <Button
                        displayStyle={DisplayStyle.IconOnly2}
                        onClick={noop}
                        Icon={Type.MenuPhone}
                      />
                      <Button
                        displayStyle={DisplayStyle.IconOnly2}
                        onClick={noop}
                        Icon={Type.Message}
                      />
                    </ButtonWrapper>
                  </IconHolder>
                </AdditionalInfoItem>
                <AdditionalInfoItem>
                  <InfoItemName message={{ id: "view.name.generic.type" }} />
                  <IconHolder iconPosition={IconHolderPosition.Left}>
                    <Icon type={details.icon} width="auto" />
                    <Input
                      value={`${intl.formatMessage({
                        id: details.description,
                      })}${timesMissed}`}
                    />
                  </IconHolder>
                </AdditionalInfoItem>
              </AdditionalInfo>
              <AdditionalInfo large heading>
                <AdditionalInfoItem>
                  <InfoItemName
                    message={{ id: "view.name.generic.duration" }}
                  />
                </AdditionalInfoItem>
                <AdditionalInfoItem>
                  <InfoItemName message={{ id: "view.name.generic.date" }} />
                </AdditionalInfoItem>
              </AdditionalInfo>
              <AdditionalInfo large>
                <Input value={formatDuration(details.duration)} />
                <Input value={callDate} />
              </AdditionalInfo>
            </>
          </CallWrapper>
        )
      })}
    </ContactDetailsWrapper>
  )
}
