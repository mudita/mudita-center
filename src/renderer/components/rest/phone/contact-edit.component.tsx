import React, { useEffect } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { Sidebar } from "Renderer/components/core/table/table.component"
import styled from "styled-components"
import { Contact } from "Renderer/models/phone/phone.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import InputComponent from "Renderer/components/core/input-text/input-text.component"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"
import { InputComponentProps } from "Renderer/components/core/input-text/input-text.interface"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { Type as IconType } from "Renderer/components/core/icon/icon.config"
import {
  DisplayStyle,
  Type,
} from "Renderer/components/core/button/button.config"
import { fontWeight } from "Renderer/styles/theming/theme-getters"
import InputCheckbox, {
  Size,
} from "Renderer/components/core/input-checkbox/input-checkbox.component"
import Icon from "Renderer/components/core/icon/icon.component"
import { useForm } from "react-hook-form"
import { noop } from "Renderer/utils/noop"
import {
  emailValidator,
  nameValidator,
  phoneNumberValidator,
  standardTextLineValidator,
} from "Renderer/utils/form-validators"

const messages = defineMessages({
  editTitle: { id: "view.name.phone.contacts.edit.title" },
  newTitle: { id: "view.name.phone.contacts.new.title" },
  firstName: { id: "view.name.phone.contacts.edit.firstName" },
  secondName: { id: "view.name.phone.contacts.edit.secondName" },
  primaryNumber: { id: "view.name.phone.contacts.edit.primaryNumber" },
  secondaryNumber: { id: "view.name.phone.contacts.edit.secondaryNumber" },
  email: { id: "view.name.phone.contacts.edit.email" },
  speedDialKeySelect: {
    id: "view.name.phone.contacts.edit.speedDialKeySelect",
  },
  speedDialKey: { id: "view.name.phone.contacts.edit.speedDialKey" },
  speedDialSettings: { id: "view.name.phone.contacts.edit.speedDialSettings" },
  addToFavourites: { id: "view.name.phone.contacts.edit.addToFavourites" },
  iceContact: { id: "view.name.phone.contacts.edit.iceContact" },
  firstAddressLine: { id: "view.name.phone.contacts.edit.firstAddressLine" },
  secondAddressLine: { id: "view.name.phone.contacts.edit.secondAddressLine" },
  notes: { id: "view.name.phone.contacts.edit.notes" },
  cancel: { id: "view.name.phone.contacts.edit.cancel" },
  save: { id: "view.name.phone.contacts.edit.save" },
})

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1.8rem;

  > div {
    width: calc(50% - 3.2rem);
  }

  select {
    height: 1.8rem;
    margin-top: 3.8rem;
    margin-bottom: 0.7rem;
  }
`

const Buttons = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(2, minmax(13rem, 1fr));
  grid-column-gap: 1.6rem;
  width: fit-content;
  margin: 4.8rem 0 4.8rem auto;

  button {
    width: auto;
  }
`

const Input = styled(InputComponent)<InputComponentProps>`
  margin-top: 1.8rem;

  input {
    font-weight: ${fontWeight("default")};
  }
`

const SpeedDialSettings = styled(ButtonComponent)`
  padding: 0.9rem;
  height: auto;
  width: auto;
`

const SpeedDial = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  ${Input} {
    width: 8rem;
    background-color: transparent;
  }
`

const ContactDetailsWrapper = styled(Sidebar)`
  margin-top: 6.3rem;
`

const CustomCheckbox = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 3.3rem;
  padding-bottom: 1.4rem;
  cursor: pointer;

  p {
    margin: 0 0.8rem 0 1.2rem;
    text-transform: initial;
  }
`

export const defaultContact = {
  id: "",
  firstName: "",
  lastName: "",
  primaryPhoneNumber: "",
  secondaryPhoneNumber: "",
  email: "",
  note: "",
  firstAddressLine: "",
  secondAddressLine: "",
  favourite: false,
  blocked: false,
  speedDial: undefined,
  ice: false,
} as Readonly<Contact>

type NameUpdateProps = Pick<Contact, "firstName" | "lastName">

interface ContactEditProps {
  contact?: Contact
  onCancel: () => void
  onSpeedDialSettingsOpen: () => void
  onSave: (contact: Contact) => void
  onNameUpdate?: ({ firstName, lastName }: NameUpdateProps) => void
}

const ContactEdit: FunctionComponent<ContactEditProps> = ({
  contact,
  onCancel,
  onSave,
  onSpeedDialSettingsOpen,
  onNameUpdate = noop,
  ...rest
}) => {
  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: contact,
    mode: "onChange",
  })

  const handleSave = handleSubmit(data => {
    onSave(data)
  })

  const fields = watch()

  const speedDialAssignPossible =
    !errors.primaryPhoneNumber &&
    !errors.secondaryPhoneNumber &&
    (fields.primaryPhoneNumber || fields.secondaryPhoneNumber)

  const savingPossible =
    fields.firstName ||
    fields.lastName ||
    fields.primaryPhoneNumber ||
    fields.secondaryPhoneNumber ||
    fields.email ||
    fields.firstAddressLine ||
    fields.secondAddressLine ||
    fields.note

  useEffect(() => {
    onNameUpdate({ firstName: fields.firstName, lastName: fields.lastName })
  }, [fields.firstName, fields.lastName])

  const headerLeft = (
    <Text
      displayStyle={TextDisplayStyle.LargeBoldText}
      message={contact ? messages.editTitle : messages.newTitle}
    />
  )

  return (
    <ContactDetailsWrapper
      {...rest}
      show
      onClose={onCancel}
      headerLeft={headerLeft}
    >
      <form onSubmit={handleSave}>
        <Content>
          <div>
            <Input
              placeholder={intl.formatMessage(messages.firstName)}
              name="firstName"
              ref={register(nameValidator)}
              errorMessage={errors.firstName?.message}
            />
            <Input
              placeholder={intl.formatMessage(messages.secondName)}
              name="lastName"
              ref={register(nameValidator)}
              errorMessage={errors.lastName?.message}
            />
            <Input
              type="tel"
              placeholder={intl.formatMessage(messages.primaryNumber)}
              name="primaryPhoneNumber"
              ref={register(phoneNumberValidator)}
              errorMessage={errors.primaryPhoneNumber?.message}
            />
            <Input
              type="tel"
              placeholder={intl.formatMessage(messages.secondaryNumber)}
              name="secondaryPhoneNumber"
              ref={register(phoneNumberValidator)}
              errorMessage={errors.secondaryPhoneNumber?.message}
            />
            <Input
              type="email"
              name="email"
              placeholder={intl.formatMessage(messages.email)}
              defaultValue={contact?.email}
              ref={register(emailValidator)}
              errorMessage={errors.email?.message}
            />
          </div>
          <div>
            <SpeedDial>
              <select
                disabled={!speedDialAssignPossible}
                name="speedDial"
                ref={register}
              >
                <option value="">Select</option>
                {[...Array.from({ length: 10 })].map((_, index) => (
                  <option key={index} value={index}>
                    {index}
                  </option>
                ))}
              </select>
              <SpeedDialSettings
                displayStyle={DisplayStyle.Link3}
                labelMessage={messages.speedDialSettings}
                onClick={onSpeedDialSettingsOpen}
              />
            </SpeedDial>
            <CustomCheckbox>
              <InputCheckbox
                size={Size.Medium}
                name="favourite"
                ref={register}
                defaultChecked={contact?.favourite}
              />
              <Text displayStyle={TextDisplayStyle.SmallText}>
                {intl.formatMessage(messages.addToFavourites)}
              </Text>
              <Icon type={IconType.Favourites} height={1} />
            </CustomCheckbox>
            <CustomCheckbox>
              <InputCheckbox
                size={Size.Medium}
                name="ice"
                ref={register}
                defaultChecked={contact?.ice}
              />
              <Text displayStyle={TextDisplayStyle.SmallText}>
                {intl.formatMessage(messages.iceContact)}
              </Text>
              <Icon type={IconType.Ice} height={1} />
            </CustomCheckbox>
            <Input
              type="text"
              placeholder={intl.formatMessage(messages.firstAddressLine)}
              name="firstAddressLine"
              ref={register(standardTextLineValidator)}
              errorMessage={errors.firstAddressLine?.message}
            />
            <Input
              type="text"
              placeholder={intl.formatMessage(messages.secondAddressLine)}
              name="secondAddressLine"
              ref={register(standardTextLineValidator)}
              errorMessage={errors.secondAddressLine?.message}
            />
            <Input
              type="text"
              placeholder={"Note"}
              defaultValue={contact?.note}
              name="note"
              ref={register(standardTextLineValidator)}
              errorMessage={errors.note?.message}
            />
          </div>
        </Content>
        <Buttons>
          <ButtonComponent
            displayStyle={DisplayStyle.Secondary}
            labelMessage={messages.cancel}
            onClick={onCancel}
          />
          <ButtonComponent
            type={Type.Submit}
            disabled={!savingPossible || Object.keys(errors).length > 0}
            labelMessage={messages.save}
          />
        </Buttons>
      </form>
    </ContactDetailsWrapper>
  )
}

export default ContactEdit
