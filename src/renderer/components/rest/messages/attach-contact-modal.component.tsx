import React, { Ref } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Modal from "Renderer/components/core/modal/modal.component"
import { intl } from "Renderer/utils/intl"
import { Contact, ContactCategory } from "Renderer/models/phone/phone.typings"
import {
  Col,
  Group,
  Labels,
  Row,
  TextPlaceholder,
} from "Renderer/components/core/table/table.component"
import { createFullName } from "Renderer/models/phone/phone.helpers"
import { ContactListTestIdsEnum } from "Renderer/components/rest/phone/contact-list-test-ids.enum"
import Avatar, {
  AvatarSize,
} from "Renderer/components/core/avatar/avatar.component"
import { InView } from "react-intersection-observer"
import { AvatarPlaceholder } from "Renderer/components/rest/phone/contact-list.component"
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
import ContactInputSearch, {
  ContactInputSearchProvider,
  ContactListContainer,
} from "Renderer/components/rest/phone/contact-input-search.component"
import { noop } from "Renderer/utils/noop"

interface Props {
  list: ContactCategory[]
  flatList: Contact[]
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

const ListWrapper = styled(ContactListContainer)`
  height: 50rem;
  overflow: scroll;
`

const AttachContactModal: FunctionComponent<Props> = ({ list, flatList }) => {
  return (
    <Modal title={"Attach Contact"} closeButton={false}>
      <ContactInputSearchProvider contactList={list}>
        <ContactInputSearch contacts={flatList} onContactSelect={noop} />
        <ListWrapper>
          {list.map(({ category, contacts }) => {
            return (
              <ContactGroup key={category}>
                <GroupLabel>
                  <Col>{category}</Col>
                </GroupLabel>
                {contacts.map((contact) => {
                  const fullName = createFullName(contact)
                  const phoneNumber =
                    contact.primaryPhoneNumber || contact.secondaryPhoneNumber

                  const interactiveRow = (ref: Ref<HTMLDivElement>) => (
                    <Row ref={ref}>
                      <ClickableCol
                        data-testid={ContactListTestIdsEnum.ContactRow}
                      >
                        <InitialsAvatar
                          user={contact}
                          size={AvatarSize.Small}
                        />
                        {fullName ||
                          intl.formatMessage({
                            id: "view.name.phone.contacts.list.unnamedContact",
                          })}
                        {contact.blocked && (
                          <BlockedIcon width={2} height={2} />
                        )}
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
      </ContactInputSearchProvider>
    </Modal>
  )
}

export default AttachContactModal
