/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Fragment, FunctionComponent } from "react"
import { Contact } from "devices/common/models"
import { Icon, Tooltip, Typography, typographyStyles } from "app-theme/ui"
import { IconSize, IconType, TypographyWeight } from "app-theme/models"
import styled from "styled-components"
import { defineMessages, formatMessage } from "app-localize/utils"

const messages = defineMessages({
  phoneNumberLabel: {
    id: "apiDevice.contacts.details.labels.phoneNumber",
  },
  phoneNumberOnDeviceLabel: {
    id: "apiDevice.contacts.details.labels.phoneNumberOnDevice",
  },
  defaultNumberTooltip: {
    id: "apiDevice.contacts.details.defaultNumberTooltip",
  },
})

interface Props {
  phoneNumbers: Contact["phoneNumbers"]
}

export const DetailsPhoneNumber: FunctionComponent<Props> = ({
  phoneNumbers = [],
}) => {
  const moreNumbers = phoneNumbers.length > 2
  return (
    <Wrapper>
      <Typography.H5 message={messages.phoneNumberLabel.id} />
      <Grid>
        {moreNumbers && (
          <>
            <MoreNumbersBackground />
            <MoreNumbersTitle
              weight={TypographyWeight.Bold}
              color={"black"}
              message={messages.phoneNumberOnDeviceLabel.id}
            />
          </>
        )}
        {phoneNumbers.map(({ phoneNumber, phoneType }, index) => (
          <Fragment key={index}>
            <TextWrapper>{phoneNumber}</TextWrapper>
            <TextWrapper $noSelect>•</TextWrapper>
            <TextWrapper>
              {phoneType.substring(0, 1).toUpperCase() +
                phoneType.substring(1).toLowerCase()}
            </TextWrapper>
            <TextWrapper>
              {index === 0 && (
                <Tooltip
                  placement={"bottom-right"}
                  offset={{
                    x: 14,
                    y: 10,
                  }}
                >
                  <Tooltip.Anchor>
                    <DefaultIcon
                      type={IconType.CheckCircle}
                      size={IconSize.Small}
                    />
                  </Tooltip.Anchor>
                  <Tooltip.Content>
                    {formatMessage(messages.defaultNumberTooltip)}
                  </Tooltip.Content>
                </Tooltip>
              )}
            </TextWrapper>
          </Fragment>
        ))}
      </Grid>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-self: flex-start;
`

const MoreNumbersTitle = styled(Typography.P5)`
  grid-column-start: 1;
  grid-column-end: 5;
  z-index: 1;
  padding: 1.4rem 1.4rem 0.8rem;
`

const MoreNumbersBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 4;
  background-color: ${({ theme }) => theme.app.color.grey6};
  border-radius: ${({ theme }) => theme.app.radius.sm};
  border: 0.15rem solid ${({ theme }) => theme.app.color.grey5};
`

const TextWrapper = styled.div<{ $noSelect?: boolean }>`
  z-index: 1;
  ${typographyStyles.paragraph.p4};
  color: ${({ theme }) => theme.app.color.black};
  user-select: ${({ $noSelect }) => ($noSelect ? "none" : "auto")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-auto-rows: auto;
  column-gap: 0.6rem;
  row-gap: 0.4rem;
  position: relative;

  ${TextWrapper} {
    &:nth-child(4) {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }

  &:has(${MoreNumbersBackground}) {
    ${TextWrapper} {
      &:nth-child(4n - 1) {
        padding-left: 1.4rem;
      }
      &:nth-child(4n + 2) {
        padding-right: 1.4rem;
      }
      &:nth-child(7) {
        padding-bottom: 1.4rem;
      }
      &:nth-child(11),
      &:nth-child(12),
      &:nth-child(13),
      &:nth-child(14) {
        margin-top: 0.4rem;
      }
    }
  }
`

const DefaultIcon = styled(Icon)`
  display: block;
`
