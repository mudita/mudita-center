/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useMemo } from "react"
import styled from "styled-components"
import { Contact } from "devices/common/models"
import { IconButton, Typography } from "app-theme/ui"
import { IconSize, IconType, TypographyWeight } from "app-theme/models"
import { AnimatePresence, motion } from "motion/react"
import { DetailsPhoneNumber } from "./details-phone-number"
import { DetailsSingleRow } from "./details-single-row"
import { NameField } from "./name-field"
import { defineMessages, formatMessage } from "app-localize/utils"

const messages = defineMessages({
  title: {
    id: "apiDevice.contacts.details.title",
  },

  firstNameLabel: {
    id: "apiDevice.contacts.details.labels.firstName",
  },
  lastNameLabel: {
    id: "apiDevice.contacts.details.labels.lastName",
  },
  prefixLabel: {
    id: "apiDevice.contacts.details.labels.prefix",
  },
  suffixLabel: {
    id: "apiDevice.contacts.details.labels.suffix",
  },
  middleNameLabel: {
    id: "apiDevice.contacts.details.labels.middleName",
  },
  emailLabel: {
    id: "apiDevice.contacts.details.labels.email",
  },
  nickLabel: {
    id: "apiDevice.contacts.details.labels.nick",
  },
  companyLabel: {
    id: "apiDevice.contacts.details.labels.company",
  },
  departmentLabel: {
    id: "apiDevice.contacts.details.labels.department",
  },
  jobTitleLabel: {
    id: "apiDevice.contacts.details.labels.jobTitle",
  },
  sipLabel: {
    id: "apiDevice.contacts.details.labels.sip",
  },
  addressLabel: {
    id: "apiDevice.contacts.details.labels.address",
  },
  websiteLabel: {
    id: "apiDevice.contacts.details.labels.website",
  },
  notesLabel: {
    id: "apiDevice.contacts.details.labels.notes",
  },
})

interface Props {
  contact?: Contact
  onDelete?: VoidFunction
  onClose?: VoidFunction
}

export const Details: FunctionComponent<Props> = ({
  contact,
  onDelete,
  onClose,
}) => {
  const moreDetails = useMemo(() => {
    return [
      {
        label: formatMessage(messages.firstNameLabel),
        value: contact?.firstName,
      },
      {
        label: formatMessage(messages.lastNameLabel),
        value: contact?.lastName,
      },
      {
        label: formatMessage(messages.prefixLabel),
        value: contact?.namePrefix,
      },
      {
        label: formatMessage(messages.middleNameLabel),
        value: contact?.middleName,
      },
      {
        label: formatMessage(messages.suffixLabel),
        value: contact?.nameSuffix,
      },
      ...(contact?.emailAddresses || []).map((email) => {
        const type =
          email.emailType.charAt(0).toUpperCase() +
          email.emailType.slice(1).toLowerCase()
        return {
          label: formatMessage(messages.emailLabel, { type }),
          value: email.emailAddress,
        }
      }),
      {
        label: formatMessage(messages.nickLabel),
        value: contact?.nickName,
      },
      {
        label: formatMessage(messages.companyLabel),
        value: contact?.company,
      },
      {
        label: formatMessage(messages.departmentLabel),
        value: contact?.department,
      },
      {
        label: formatMessage(messages.jobTitleLabel),
        value: contact?.workTitle,
      },
      {
        label: formatMessage(messages.sipLabel),
        value: contact?.sip,
      },
      ...(contact?.address
        ? [
            {
              label: formatMessage(messages.addressLabel, {
                type: `${contact.address.type.substring(0, 1).toUpperCase()}${contact.address.type.substring(1).toLowerCase()}`,
              }),
              value: [
                [
                  contact.address.streetAddress,
                  contact.address.secondStreetAddress,
                ]
                  .filter(Boolean)
                  .join(" "),
                [contact.address.zipCode, contact.address.city]
                  .filter(Boolean)
                  .join(", "),
                contact.address.poBox,
                contact.address.state,
                contact.address.country,
              ]
                .filter(Boolean)
                .join("\n"),
            },
          ]
        : []),
      {
        label: formatMessage(messages.websiteLabel),
        value: contact?.website,
      },
      {
        label: formatMessage(messages.notesLabel),
        value: contact?.notes,
      },
    ]
  }, [contact])

  return (
    <AnimatePresence initial={false} mode={"sync"}>
      {contact && (
        <Wrapper
          initial={{
            opacity: 0,
            marginRight: -608,
          }}
          animate={{
            opacity: 1,
            marginRight: 0,
          }}
          exit={{
            opacity: 0,
            marginRight: -608,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Header>
            <HeaderName>
              <Typography.H3 weight={TypographyWeight.Regular} lines={1}>
                <NameField contact={contact} />
              </Typography.H3>
            </HeaderName>
            <HeaderActions>
              <IconButton
                icon={IconType.Trash}
                size={IconSize.Big}
                onClick={onDelete}
              />
              <IconButton
                icon={IconType.Close}
                size={IconSize.Big}
                onClick={onClose}
              />
            </HeaderActions>
          </Header>
          <Content>
            <Typography.H4 message={messages.title.id} />
            <DetailsPhoneNumber phoneNumbers={contact.phoneNumbers} />
            {moreDetails.map((detail, index) => (
              <DetailsSingleRow
                key={index}
                label={detail.label}
                value={detail.value}
              />
            ))}
          </Content>
        </Wrapper>
      )}
    </AnimatePresence>
  )
}

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.app.color.white};
  border: 0.1rem solid ${({ theme }) => theme.app.color.grey4};
  border-bottom: none;
  border-right: none;
  width: 100%;
  max-width: 60.8rem;
`

const Header = styled.div`
  height: 8.2rem;
  padding: 0 3.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.2rem solid ${({ theme }) => theme.app.color.grey5};
`

const HeaderName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;

  h3 {
    white-space: pre;
  }
`

const HeaderActions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.4rem;
`

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2.4rem 3.2rem;
  gap: 1.8rem;
  overflow-x: hidden;
  overflow-y: auto;

  > h4:first-of-type {
    margin-bottom: 1.4rem;
  }
`
