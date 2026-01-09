/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, memo } from "react"
import styled, { css } from "styled-components"
import { useFormContext } from "react-hook-form"
import { Button, Checkbox, Icon, Tooltip, Typography } from "app-theme/ui"
import {
  ButtonSize,
  ButtonTextModifier,
  ButtonType,
  CheckboxSize,
  IconSize,
  IconType,
} from "app-theme/models"
import { Contact } from "devices/common/models"
import { NameField } from "./name-field"
import { FormValues } from "./form"

export const ColumnCheckbox: FunctionComponent<{
  id: string
  checkboxDataAttr: string
}> = memo(({ id, checkboxDataAttr }) => {
  const { register } = useFormContext<FormValues>()

  return (
    <CheckboxCell>
      <Tooltip placement={"bottom-right"} offset={{ x: 24, y: 5 }}>
        <Tooltip.Anchor>
          <CustomCheckbox
            {...{
              [checkboxDataAttr]: true,
            }}
            key={id}
            size={CheckboxSize.Small}
            {...register(`selectedContacts.${id}`)}
          />
        </Tooltip.Anchor>
        <Tooltip.Content>Select</Tooltip.Content>
      </Tooltip>
    </CheckboxCell>
  )
})

export const ColumnName: FunctionComponent<{ contact: Contact }> = memo(
  ({ contact }) => {
    return (
      <NameCell>
        <Typography.P1 color={"black"} lines={1}>
          <NameField contact={contact} />
          {contact.starred && (
            <StarIcon>
              <Icon type={IconType.StarFilled} size={IconSize.Small} />
            </StarIcon>
          )}
        </Typography.P1>
      </NameCell>
    )
  }
)

export const ColumnPhone: FunctionComponent<{
  phoneNumbers?: Pick<
    NonNullable<Contact["phoneNumbers"]>[number],
    "phoneNumber"
  >[]
  hidden?: boolean
}> = memo(({ phoneNumbers, hidden }) => {
  return (
    <PhoneCell $hidden={hidden}>
      <Typography.P1 color={"black"} lines={1}>
        {phoneNumbers?.[0]?.phoneNumber}
      </Typography.P1>
    </PhoneCell>
  )
})

export const ColumnMorePhones: FunctionComponent<{
  phoneNumbers?: Pick<
    NonNullable<Contact["phoneNumbers"]>[number],
    "phoneNumber"
  >[]
  hidden?: boolean
}> = memo(({ phoneNumbers, hidden }) => {
  const phones = phoneNumbers
    ?.slice(1)
    .map((phoneNumber) => phoneNumber.phoneNumber)
  return (
    <MorePhonesCell $hidden={hidden}>
      {Boolean(phones?.length) && (
        <Tooltip placement={"bottom-right"} offset={{ x: 0, y: 16 }}>
          <Tooltip.Content>
            {phones?.map((phone, index) => (
              <Typography.P5 color={"grey1"} key={index}>
                {phone}
              </Typography.P5>
            ))}
          </Tooltip.Content>
          <Tooltip.Anchor>
            <MorePhonesButton
              type={ButtonType.Text}
              size={ButtonSize.AutoMin}
              modifiers={[ButtonTextModifier.HoverBackground]}
            >
              +{phones?.length}
            </MorePhonesButton>
          </Tooltip.Anchor>
        </Tooltip>
      )}
    </MorePhonesCell>
  )
})

const Column = styled.div<{ $hidden?: boolean }>`
  position: relative;
  transition-property: width, padding, opacity, visibility;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  transition-delay: 0.15s;
  overflow: hidden;
  opacity: 1;
  visibility: visible;

  ${({ $hidden }) =>
    $hidden &&
    css`
      transition-delay: 0s;
      width: 0 !important;
      padding: 0;
      opacity: 0;
      visibility: hidden;
    `}
`

const CheckboxCell = styled(Column)`
  width: 7.2rem;
  padding-left: 2.2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const CustomCheckbox = styled(Checkbox)`
  width: 3.6rem;
  height: 3.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const NameCell = styled(Column)`
  flex: 1;
  padding: 0 0.4rem;

  p {
    white-space: pre;
  }
`

const StarIcon = styled.span`
  display: inline-block;
  height: 1em;
`

const PhoneCell = styled(Column)`
  width: 16rem;
  text-align: right !important;
  padding-right: 1.2rem;

  p {
    padding-left: 1.2rem;
  }
`

const MorePhonesCell = styled(Column)`
  width: 5.8rem;
  padding-right: 3.2rem;
`

const MorePhonesButton = styled(Button)`
  padding: 0;
  width: 2.6rem;
  height: 2.4rem;
  border-radius: ${({ theme }) => theme.app.radius.xs};
`
