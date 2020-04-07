import React from "react"
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
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import Dropdown from "Renderer/components/core/dropdown/dropdown.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { fontWeight } from "Renderer/styles/theming/theme-getters"
import InputCheckbox, {
  Size,
} from "Renderer/components/core/input-checkbox/input-checkbox.component"
import Icon from "Renderer/components/core/icon/icon.component"
import useForm from "Renderer/utils/hooks/use-form"

const messages = defineMessages({
  title: { id: "view.name.phone.contacts.edit.title" },
  firstName: { id: "view.name.phone.contacts.edit.firstName" },
  secondName: { id: "view.name.phone.contacts.edit.secondName" },
  number: { id: "view.name.phone.contacts.edit.number" },
  otherNumber: { id: "view.name.phone.contacts.edit.otherNumber" },
  email: { id: "view.name.phone.contacts.edit.email" },
  speedDialKeySelect: {
    id: "view.name.phone.contacts.edit.speedDialKeySelect",
  },
  speedDialKey: { id: "view.name.phone.contacts.edit.speedDialKey" },
  speedDialSettings: { id: "view.name.phone.contacts.edit.speedDialSettings" },
  addToFavourites: { id: "view.name.phone.contacts.edit.addToFavourites" },
  iceContact: { id: "view.name.phone.contacts.edit.iceContact" },
  address: { id: "view.name.phone.contacts.edit.address" },
  notes: { id: "view.name.phone.contacts.edit.notes" },
  cancel: { id: "view.name.phone.contacts.edit.cancel" },
  save: { id: "view.name.phone.contacts.edit.save" },
})

interface ContactEditProps {
  contact: Contact
  onClose: () => void
  onCancel: () => void
  onSpeedDialSettingsOpen: () => void
  onSave: (contact: Contact) => void
}

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1.8rem;

  > div {
    width: calc(50% - 3.2rem);
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

const SpeedDialDropdownWrapper = styled(Dropdown)`
  ul {
    min-width: 8rem;
    padding: 1rem 0;
  }
`

const DropdownIconButton = styled(ButtonComponent)`
  width: 1rem;
  height: 1rem;
`

const DropdownButton = styled(ButtonComponent)`
  padding-left: 1.5rem;
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

const ContactEdit: FunctionComponent<ContactEditProps> = ({
  contact,
  onCancel,
  onSave,
  onSpeedDialSettingsOpen,
  ...rest
}) => {
  const { fields, updateField } = useForm<Contact>(contact)

  const saveHandler = () => {
    onSave(fields)
  }

  const Title = () => (
    <Text
      displayStyle={TextDisplayStyle.LargeBoldText}
      message={messages.title}
    />
  )

  const SpeedDialDropdown = () => (
    <SpeedDialDropdownWrapper
      toggler={
        <DropdownIconButton
          displayStyle={DisplayStyle.InputIcon}
          Icon={Type.ArrowDown}
        />
      }
    >
      {[...Array.from({ length: 10 })].map((_, index) => (
        <DropdownButton
          key={index}
          label={index.toString()}
          displayStyle={DisplayStyle.Link1}
        />
      ))}
    </SpeedDialDropdownWrapper>
  )

  return (
    <ContactDetailsWrapper {...rest} show headerLeft={<Title />}>
      <Content>
        <div>
          <Input
            placeholder={intl.formatMessage(messages.firstName)}
            name="firstName"
            value={fields.firstName}
            onChange={updateField}
          />
          <Input
            placeholder={intl.formatMessage(messages.secondName)}
            name="lastName"
            value={fields.lastName}
            onChange={updateField}
          />
          <Input
            placeholder={intl.formatMessage(messages.number)}
            name="phoneNumbers[0]"
            value={fields.phoneNumbers[0]}
            onChange={updateField}
          />
          <Input
            placeholder={intl.formatMessage(messages.otherNumber)}
            name="phoneNumbers[1]"
            value={fields.phoneNumbers[1]}
            onChange={updateField}
          />
          <Input placeholder={intl.formatMessage(messages.email)} />
        </div>
        <div>
          <SpeedDial>
            <Input
              placeholder={intl.formatMessage(messages.speedDialKey)}
              trailingIcons={[<SpeedDialDropdown key={"dropdown"} />]}
              defaultValue={intl.formatMessage(messages.speedDialKeySelect)}
              value={fields.speedDial}
              name="speedDial"
              onChange={updateField}
              disabled
            />
            <SpeedDialSettings
              displayStyle={DisplayStyle.Link3}
              labelMessage={messages.speedDialSettings}
              onClick={onSpeedDialSettingsOpen}
            />
          </SpeedDial>
          <CustomCheckbox>
            <InputCheckbox
              size={Size.Medium}
              checked={fields.favourite}
              name="favourite"
              onChange={updateField}
            />
            <Text displayStyle={TextDisplayStyle.SmallText}>
              {intl.formatMessage(messages.addToFavourites)}
            </Text>
            <Icon type={Type.Favourites} height={1} />
          </CustomCheckbox>
          <CustomCheckbox>
            <InputCheckbox
              size={Size.Medium}
              checked={fields.ice}
              name="ice"
              onChange={updateField}
            />
            <Text displayStyle={TextDisplayStyle.SmallText}>
              {intl.formatMessage(messages.iceContact)}
            </Text>
            <Icon type={Type.Ice} height={1} />
          </CustomCheckbox>
          <Input
            type="textarea"
            outlined={false}
            placeholder={intl.formatMessage(messages.address)}
            value={fields.address}
            name="address"
            onChange={updateField}
          />
          <Input
            type="textarea"
            outlined={false}
            placeholder={intl.formatMessage(messages.notes)}
            value={fields.note}
            name="note"
            onChange={updateField}
          />
        </div>
      </Content>
      <Buttons>
        <ButtonComponent
          displayStyle={DisplayStyle.Secondary}
          labelMessage={messages.cancel}
          onClick={onCancel}
        />
        <ButtonComponent labelMessage={messages.save} onClick={saveHandler} />
      </Buttons>
    </ContactDetailsWrapper>
  )
}

export default ContactEdit
