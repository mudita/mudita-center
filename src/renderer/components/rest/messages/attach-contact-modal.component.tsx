import React, { ChangeEvent, Ref, useEffect, useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Modal from "Renderer/components/core/modal/modal.component"
import {
  InputText,
  searchIcon,
} from "Renderer/components/core/input-text/input-text.elements"
import { intl } from "Renderer/utils/intl"
import { ContactCategory } from "Renderer/models/phone/phone.typings"
import {
  Col,
  Group,
  Labels,
  Row,
  TextPlaceholder,
} from "Renderer/components/core/table/table.component"
import {
  createFullName,
  // searchContact,
} from "Renderer/models/phone/phone.helpers"
// import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { ContactListTestIdsEnum } from "Renderer/components/rest/phone/contact-list-test-ids.enum"
import Avatar, {
  AvatarSize,
} from "Renderer/components/core/avatar/avatar.component"
// import Dropdown from "Renderer/components/core/dropdown/dropdown.component"
// import Icon from "Renderer/components/core/icon/icon.component"
// import { Type } from "Renderer/components/core/icon/icon.config"
// import ButtonComponent from "Renderer/components/core/button/button.component"
// import { DisplayStyle } from "Renderer/components/core/button/button.config"
// import ScrollAnchorContainer from "Renderer/components/rest/scroll-anchor-container/scroll-anchor-container.component"
import { InView } from "react-intersection-observer"
import {
  AvatarPlaceholder,
  // Checkbox,
} from "Renderer/components/rest/phone/contact-list.component"
import styled from "styled-components"
import {
  backgroundColor,
  borderRadius,
  textColor,
} from "Renderer/styles/theming/theme-getters"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

interface Props {
  list: ContactCategory[]
  searchValue: string
  changeSearchValue?: (event: ChangeEvent<HTMLInputElement>) => void
}

const GroupLabel = styled(Labels)`
  background-color: ${backgroundColor("row")};
`
const BlockedIcon = styled(Icon).attrs(() => ({
  type: Type.Blocked,
}))`
  margin-left: 1.6rem;
`

const ClickableCol = styled(Col)`
  height: 100%;
  margin-left: 2rem;
`
const ContactGroup = styled(Group)`
  --columnsTemplate: 22.5% 22.5% 22.5% 22.5% 10%;
  --columnsGap: auto;
  --labelBackground: ${backgroundColor("row")};
`

const MoreNumbers = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.SmallText,
}))`
  width: 3.2rem;
  padding: 0 1rem;
  box-sizing: border-box;
  margin-left: 1.6rem;
  text-align: center;
  color: ${textColor("primary")};
  background-color: ${backgroundColor("disabled")};
  border-radius: ${borderRadius("medium")};
`

const InitialsAvatar = styled(Avatar)`
  margin-right: 1.2rem;
`

const Search = styled(InputText)`
  margin-bottom: 3rem;
`

const ListWrapper = styled.div`
  height: 50rem;
  overflow: scroll;
`

const AttachContactModal: FunctionComponent<Props> = ({
  list,
  searchValue,
  changeSearchValue,
}) => {
  const [contactList, setContactList] = useState(list)
  // const [searchValue, setSearchValue] = useState("")
  // let filteredList = searchContact(list, searchValue)
  useEffect(() => setContactList(list), [list])
  return (
    <Modal title={"Attach Contact"} closeButton={false}>
      <Search
        type={"search"}
        label={intl.formatMessage({
          id: "view.name.messages.search",
        })}
        outlined
        defaultValue={searchValue}
        onChange={changeSearchValue}
        leadingIcons={[searchIcon]}
      />
      <ListWrapper>
        {contactList.map(({ category, contacts }) => {
          return (
            <ContactGroup key={category}>
              <GroupLabel>
                {/*<Col />*/}
                <Col>{category}</Col>
              </GroupLabel>
              {contacts.map((contact) => {
                // const { selected } = getRowStatus(contact)
                // const onChange = () => toggleRow(contact)
                // const handleExport = () => onExport(contact)
                // const handleForward = () => onForward(contact)
                // const handleBlock = () => onBlock(contact)
                // const handleUnblock = () => onUnblock(contact)
                // const handleDelete = () => onDelete(contact)
                // const handleSelect = () => onSelect(contact)

                const fullName = createFullName(contact)
                const phoneNumber =
                  contact.primaryPhoneNumber || contact.secondaryPhoneNumber
                // const nextContact = contacts[index + 1]
                //   ? contacts[index + 1]
                //   : contactList[categoryIndex + 1]?.contacts[0]
                // const scrollActive =
                //   (nextContact || contacts[index]).id === activeRow?.id

                const interactiveRow = (ref: Ref<HTMLDivElement>) => (
                  <Row
                    // selected={selected}
                    // active={(activeRow || editedContact)?.id === contact.id}
                    ref={ref}
                  >
                    {/*<Col>*/}
                    {/*  <Checkbox*/}
                    {/*    // checked={selected}*/}
                    {/*    // onChange={onChange}*/}
                    {/*    size={Size.Small}*/}
                    {/*    // visible={!noneRowsSelected}*/}
                    {/*  />*/}
                    {/*</Col>*/}
                    <ClickableCol
                      // onClick={handleSelect}
                      data-testid={ContactListTestIdsEnum.ContactRow}
                    >
                      <InitialsAvatar
                        user={contact}
                        // light={selected || activeRow === contact}
                        size={AvatarSize.Small}
                      />
                      {fullName ||
                        intl.formatMessage({
                          id: "view.name.phone.contacts.list.unnamedContact",
                        })}
                      {contact.blocked && <BlockedIcon width={2} height={2} />}
                    </ClickableCol>
                    <Col>{contact.firstAddressLine}</Col>
                    <Col>{contact.email}</Col>
                    <Col>{contact.primaryPhoneNumber}</Col>
                    <Col>
                      {contact.primaryPhoneNumber &&
                        contact.secondaryPhoneNumber && (
                          <MoreNumbers>+1</MoreNumbers>
                        )}
                    </Col>
                    {/*<ScrollAnchorContainer*/}
                    {/*  key={contact.id + category}*/}
                    {/*  active={scrollActive}*/}
                    {/*/>*/}
                  </Row>
                )

                const placeholderRow = (ref: Ref<HTMLDivElement>) => {
                  return (
                    <Row ref={ref}>
                      <Col />
                      <Col>
                        <AvatarPlaceholder />
                        <TextPlaceholder charsCount={fullName.length} />
                      </Col>
                      <Col>
                        {phoneNumber && (
                          <TextPlaceholder charsCount={phoneNumber.length} />
                        )}
                      </Col>
                      {/*<ScrollAnchorContainer*/}
                      {/*  key={contact.id + category}*/}
                      {/*  active={scrollActive}*/}
                      {/*/>*/}
                    </Row>
                  )
                }

                return (
                  <InView key={category + contact.id}>
                    {({ inView, ref }) =>
                      inView ? interactiveRow(ref) : placeholderRow(ref)
                    }
                  </InView>
                )
              })}
            </ContactGroup>
          )
        })}
      </ListWrapper>
    </Modal>
  )
}

export default AttachContactModal
