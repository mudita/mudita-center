import React, { useEffect, FocusEvent } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { Contact } from "Renderer/models/phone/phone.typings"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { Type as IconType } from "Renderer/components/core/icon/icon.config"
import {
  DisplayStyle,
  Type,
} from "Renderer/components/core/button/button.config"
import InputCheckbox, {
  Size,
} from "Renderer/components/core/input-checkbox/input-checkbox.component"
import Icon from "Renderer/components/core/icon/icon.component"
import { useForm } from "react-hook-form"
import {
  emailValidator,
  phoneNumberValidator,
} from "Renderer/utils/form-validators"
import InputSelect, {
  RenderInputSelectListItem,
} from "Renderer/components/core/input-select/input-select.component"
import Loader from "Renderer/components/core/loader/loader.component"
import { LoaderType } from "Renderer/components/core/loader/loader.interface"
import { noop } from "Renderer/utils/noop"
import {
  Buttons,
  ContactDetailsWrapper,
  Content,
  CustomCheckbox,
  Input,
  SpeedDial,
  SpeedDialListItem,
  speedDialListStyles,
  SpeedDialSettings,
} from "Renderer/components/rest/phone/contact-edit.styled"
import { NewContact } from "Renderer/models/phone/phone.typings"

const messages = defineMessages({
  editTitle: { id: "view.name.phone.contacts.edit.title" },
  newTitle: { id: "view.name.phone.contacts.new.title" },
  firstName: { id: "view.name.phone.contacts.edit.firstName" },
  secondName: { id: "view.name.phone.contacts.edit.secondName" },
  primaryNumber: { id: "view.name.phone.contacts.edit.primaryNumber" },
  secondaryNumber: { id: "view.name.phone.contacts.edit.secondaryNumber" },
  email: { id: "view.name.phone.contacts.edit.email" },
  speedDialKeyEmptyOption: {
    id: "view.name.phone.contacts.edit.speedDialKeyEmptyOption",
  },
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

export const defaultContact = {
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
} as NewContact

type NameUpdateProps = Pick<Contact, "firstName" | "lastName">

interface ContactEditProps {
  contact?: Contact
  speedDialChosenList: number[]
  onCancel: (contact?: Contact) => void
  onSpeedDialSettingsOpen: () => void
  onSave: (contact: Contact) => void
  onNameUpdate?: ({ firstName, lastName }: NameUpdateProps) => void
  saving?: boolean
}

const ContactEdit: FunctionComponent<ContactEditProps> = ({
  contact,
  speedDialChosenList,
  onCancel,
  onSave,
  onSpeedDialSettingsOpen,
  onNameUpdate = noop,
  saving,
  ...rest
}) => {
  const { register, handleSubmit, watch, errors, setValue } = useForm({
    defaultValues: contact,
    mode: "onChange",
  })

  const handleCancel = () => {
    onCancel(contact)
  }

  const handleSave = handleSubmit((data) => {
    const formData = {
      ...contact,
      ...data,
      speedDial:
        data.speedDial?.toString() ===
        intl.formatMessage(messages.speedDialKeySelect)
          ? undefined
          : Number(data.speedDial),
    }
    onSave(formData)
  })

  const fields = watch()

  useEffect(() => {
    handleSpeedDialSelect(contact?.speedDial)
  }, [contact?.speedDial])

  const speedDialAssignPossible =
    (fields.primaryPhoneNumber && !errors.primaryPhoneNumber) ||
    (fields.secondaryPhoneNumber && !errors.secondaryPhoneNumber)

  const savingPossible =
    fields.firstName?.trim() ||
    fields.lastName?.trim() ||
    fields.primaryPhoneNumber ||
    fields.secondaryPhoneNumber ||
    fields.email ||
    fields.firstAddressLine?.trim() ||
    fields.secondAddressLine?.trim() ||
    fields.note?.trim()

  const trimInputValue = (event: FocusEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.trim()
  }

  const handleUsernameBlur = (event: FocusEvent<HTMLInputElement>) => {
    trimInputValue(event)
    onNameUpdate({ firstName: fields.firstName, lastName: fields.lastName })
  }

  const handleSpeedDialSelect = (value: number | undefined) => {
    setValue("speedDial", value)
  }

  const speedDialListItemRenderer: RenderInputSelectListItem<number> = ({
    item,
    props,
  }) => <SpeedDialListItem {...props}>{item}</SpeedDialListItem>

  const headerLeft = (
    <Text
      displayStyle={TextDisplayStyle.LargeBoldText}
      message={contact?.id ? messages.editTitle : messages.newTitle}
    />
  )

  return (
    <ContactDetailsWrapper
      {...rest}
      show
      onClose={handleCancel}
      headerLeft={headerLeft}
    >
      <form onSubmit={handleSave}>
        <Content>
          <div>
            <Input
              type="text"
              label={intl.formatMessage(messages.firstName)}
              name="firstName"
              ref={register}
              errorMessage={errors.firstName?.message}
              onBlur={handleUsernameBlur}
            />
            <Input
              type="text"
              label={intl.formatMessage(messages.secondName)}
              name="lastName"
              ref={register}
              errorMessage={errors.lastName?.message}
              onBlur={handleUsernameBlur}
            />
            <Input
              type="tel"
              label={intl.formatMessage(messages.primaryNumber)}
              name="primaryPhoneNumber"
              ref={register(phoneNumberValidator)}
              errorMessage={errors.primaryPhoneNumber?.message}
            />
            <Input
              type="tel"
              label={intl.formatMessage(messages.secondaryNumber)}
              name="secondaryPhoneNumber"
              ref={register(phoneNumberValidator)}
              errorMessage={errors.secondaryPhoneNumber?.message}
            />
            <Input
              type="email"
              name="email"
              label={intl.formatMessage(messages.email)}
              defaultValue={contact?.email}
              ref={register(emailValidator)}
              errorMessage={errors.email?.message}
            />
          </div>
          <div>
            <SpeedDial>
              <InputSelect
                name="speedDial"
                ref={register}
                disabled={!speedDialAssignPossible}
                items={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                disabledItems={speedDialChosenList}
                label={intl.formatMessage(messages.speedDialKey)}
                emptyItemValue={intl.formatMessage(
                  messages.speedDialKeyEmptyOption
                )}
                onSelect={handleSpeedDialSelect}
                selectedItem={
                  fields.speedDial ||
                  intl.formatMessage(messages.speedDialKeySelect)
                }
                listStyles={speedDialListStyles}
                renderListItem={speedDialListItemRenderer}
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
              label={intl.formatMessage(messages.firstAddressLine)}
              name="firstAddressLine"
              ref={register}
              errorMessage={errors.firstAddressLine?.message}
              maxLength={30}
              onBlur={trimInputValue}
            />
            <Input
              type="text"
              label={intl.formatMessage(messages.secondAddressLine)}
              name="secondAddressLine"
              ref={register}
              errorMessage={errors.secondAddressLine?.message}
              maxLength={30}
              onBlur={trimInputValue}
            />
            <Input
              type="text"
              label={"Note"}
              defaultValue={contact?.note}
              name="note"
              ref={register}
              errorMessage={errors.note?.message}
              maxLength={30}
              onBlur={trimInputValue}
            />
          </div>
        </Content>
        <Buttons>
          <ButtonComponent
            displayStyle={DisplayStyle.Secondary}
            labelMessage={messages.cancel}
            onClick={handleCancel}
          />
          <ButtonComponent
            type={Type.Submit}
            disabled={
              !savingPossible || Object.keys(errors).length > 0 || saving
            }
            label={
              saving ? (
                <Loader size={2} type={LoaderType.Spinner} />
              ) : (
                intl.formatMessage(messages.save)
              )
            }
          />
        </Buttons>
      </form>
    </ContactDetailsWrapper>
  )
}

export default ContactEdit
