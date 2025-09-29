/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { useSelector } from "react-redux"
import { EntitiesLoader } from "../../entities/entities-loader"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import {
  selectActiveApiDeviceId,
  selectContactsPhoneDuplicates,
} from "generic-view/store"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { EntitiesLoaderConfig } from "Libs/generic-view/models/src"
import { ButtonSecondary } from "../../buttons/button-secondary"
import { ButtonPrimary } from "../../buttons/button-primary"
import { AppPortal } from "Root/libs/generic-view/ui/src/lib/data-rows/app-portal"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { Typography } from "../../typography/typography"
import { Badge } from "../../labels/badge"
import { Modal } from "Root/libs/generic-view/ui/src/lib/interactive/modal/modal"
import { IconType } from "generic-view/utils"
import styled from "styled-components"

interface McContactsDuplicatesProps {
  config: ContactsDuplicatesListConfig
}

interface ContactsDuplicatesListConfig {
  loaderConfig: EntitiesLoaderConfig
  emptyView?: React.ReactNode
}

const messages = defineMessages({
  mergeAllTitle: {
    id: "module.contacts.duplicates.mergeAllTitle",
  },
  mergeAllDescription: {
    id: "module.contacts.duplicates.mergeAllDescription",
  },
  mergeAllNote: {
    id: "module.contacts.duplicates.mergeAllNote",
  },
  mergeAllButton: {
    id: "module.contacts.duplicates.mergeAllButton",
  },
  mergeButton: {
    id: "module.contacts.duplicates.mergeButton",
  },
  keepBadge: {
    id: "module.contacts.duplicates.keepBadge",
  },
  mergeBadge: {
    id: "module.contacts.duplicates.mergeBadge",
  },
  noDuplicatesTitle: {
    id: "module.contacts.duplicates.noDuplicatesTitle",
  },
  noDuplicatesDescription: {
    id: "module.contacts.duplicates.noDuplicatesDescription",
  },
})

interface ContactData {
  contactId?: string
  firstName?: string
  lastName?: string
  displayName1?: string
  displayName2?: string
  displayName3?: string
  displayName4?: string
  phoneNumbers?: Array<{
    id: string
    phoneNumber: string
    phoneType: string
    unifiedPhoneNumber: string
  }>
  sortField?: string
}

interface ContactCardProps {
  type: "Keep" | "Merge"
  contact: ContactData
}

export const McContactsDuplicates: FunctionComponent<
  McContactsDuplicatesProps
> = (props) => {
  const { loaderConfig } = props.config ?? {}

  const deviceId = useSelector(selectActiveApiDeviceId)!
  const duplicatesData = useSelector((state: ReduxRootState) =>
    selectContactsPhoneDuplicates(state, { deviceId })
  )

  if (!duplicatesData) {
    return Loader(loaderConfig)
  }

  const sortedDuplicatesData = [...duplicatesData].sort((a, b) =>
    String(a.mainContact?.sortField ?? "").localeCompare(
      String(b.mainContact?.sortField ?? "")
    )
  )

  const hasAnyDuplicates = sortedDuplicatesData.length > 0

  if (!hasAnyDuplicates) {
    return EmptyView(
      intl.formatMessage(messages.noDuplicatesTitle),
      intl.formatMessage(messages.noDuplicatesDescription)
    )
  }
  return (
    <MergeContainer style={{ background: "white" }}>
      <AppPortal config={{ portal: "app-header" }}>
        {" "}
        ({sortedDuplicatesData.length})
      </AppPortal>
      <header className="merge-header merge-header-sticky">
        <div className="merge-header-grid">
          <div className="merge-header-titledesc">
            <Typography.H3 style={{ fontSize: "1.8rem" }}>
              {intl.formatMessage(messages.mergeAllTitle)}
            </Typography.H3>
            <Typography.P3
              config={{ color: "grey1" }}
              style={{ height: "4.4rem" }}
            >
              {intl.formatMessage(messages.mergeAllDescription)}
            </Typography.P3>
          </div>
          <div className="merge-header-btncell">
            <ButtonPrimary
              className="merge-all-btn"
              config={{
                text: intl.formatMessage(messages.mergeAllButton, {
                  count: duplicatesData.length,
                }),
                actions: [{ type: "custom", callback: () => {} }],
              }}
            />
          </div>
        </div>
        <div className="merge-header-note">
          <Typography.H4
            config={{ color: "grey1" }}
            style={{
              marginTop: "3.2rem",
              lineHeight: "2.4rem",
              letterSpacing: "2%",
            }}
          >
            {intl.formatMessage(messages.mergeAllNote)}
          </Typography.H4>
        </div>
      </header>

      <div className="duplicates-list duplicates-list-scroll">
        {sortedDuplicatesData.map((group) => (
          <div
            key={String(group.mainContact.contactId)}
            className="duplicate-row"
          >
            <div className="duplicate-cols">
              {/* Main contact (Keep) */}
              <div>
                <StyledBadgeKeep className="duplicates-badge">
                  {intl.formatMessage(messages.keepBadge)}
                </StyledBadgeKeep>
                <ContactCard type="Keep" contact={group.mainContact} />
              </div>
              {/* Duplicates (Merge) */}
              <div className="duplicates-col">
                <StyledBadgeMerge>
                  {intl.formatMessage(messages.mergeBadge)}
                </StyledBadgeMerge>
                <div className="merge-multi">
                  {group.duplicates.map((duplicates) => (
                    <ContactCard
                      type="Merge"
                      contact={duplicates}
                      key={String(duplicates.contactId)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <ButtonSecondary
              className="merge-btn"
              config={{
                text: intl.formatMessage(messages.mergeButton),
                actions: [{ type: "custom", callback: () => {} }],
              }}
            />
          </div>
        ))}
      </div>
    </MergeContainer>
  )
}

const Loader = (loaderConfig: EntitiesLoaderConfig) => (
  <StyledLoader>
    <StyledEntitiesLoader config={loaderConfig} />
  </StyledLoader>
)

const EmptyView = (title: string, description: string) => (
  <div
    style={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.8rem",
    }}
  >
    <Modal.TitleIcon
      style={{ marginBottom: "1.6rem" }}
      config={{ type: IconType.ContactsBook }}
    />
    <Typography.H3>{title}</Typography.H3>
    <Typography.P1>{description}</Typography.P1>
  </div>
)

const ContactCard: FunctionComponent<ContactCardProps> = ({
  type,
  contact,
}) => {
  const displayNames = [
    contact.displayName1,
    contact.displayName2,
    contact.displayName3,
    contact.displayName4,
  ].filter((v) => !!v)

  return (
    <div className="contact-card">
      <Typography.P1
        config={{ color: "black" }}
        style={{ marginBottom: "0.6rem" }}
        className="contact-card-ellipsis"
      >
        {contact.displayName1 && <>{contact.displayName1} </>}
        {contact.displayName2 && <>{contact.displayName2} </>}
        {contact.displayName3 && (
          <strong>
            {contact.displayName3}
            {contact.displayName4 ? " " : ""}
          </strong>
        )}
        {contact.displayName4 && <>{contact.displayName4}</>}
      </Typography.P1>
      <ul>
        {(contact.phoneNumbers || []).map((phone) => (
          <li key={phone.id}>
            <Typography.P4
              config={{ color: "black" }}
              className="contact-card-ellipsis"
            >
              {phone.unifiedPhoneNumber} •{" "}
              {phone.phoneType
                .toLowerCase()
                .replace(/\b\p{L}/gu, (c) => c.toUpperCase())}
            </Typography.P4>
          </li>
        ))}
      </ul>
    </div>
  )
}

const MergeContainer = styled.div`
  .merge-header {
    padding: 3.2rem;
    background: ${({ theme }) => theme.color.grey6};
    height: 20.2rem;
  }
  .merge-header-sticky {
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .merge-header-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
  .merge-header-titledesc {
    width: 35.6rem;
    height: 8.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .duplicates-list {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    padding-top: 3.2rem;
    padding-left: 3.2rem;
  }
  .duplicates-list-scroll {
    overflow-y: auto;
  }
  .duplicate-row {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 0.15rem solid ${({ theme }) => theme.color.grey5};
    border-radius: 0.8rem;
    background: white;
    padding: 2.4rem;
    position: relative;
    width: 56rem;
  }
  .duplicate-cols {
    display: flex;
    gap: 2.4rem;
  }
  .duplicates-col {
    flex: 1;
    position: relative;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .contact-card {
    flex: 1;
    position: relative;
    margin-bottom: 0;
    width: 24rem;
  }
  .contact-card-ellipsis {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    max-width: 100%;
  }
  .merge-btn {
    width: 11.8rem;
    height: 4rem;
    align-self: flex-end;
  }
  .merge-all-btn {
    min-width: 11.8rem;
    height: 4rem;
  }
  .merge-multi {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    flex: 1;
  }
  .contact-card ul {
    list-style: none;
    padding: 0;
    margin: 0 0 1.6rem;
  }
  .contact-card li {
    margin-bottom: 0.4rem;
  }
`

const StyledLoader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
  height: 100%;
  width: 100%;
`

const StyledEntitiesLoader = styled(EntitiesLoader)`
  grid-area: 1 / 1 / 3 / 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px 0px;
`

const StyledBadgeKeep = styled(Badge)`
  background-color: ${({ theme }) => theme.color.green};
  color: ${({ theme }) => theme.color.black};
  gap: 1rem;
  padding: 0 0.4rem 0 0.4rem;
  margin-bottom: 1.2rem;
`

const StyledBadgeMerge = styled(Badge)`
  background-color: ${({ theme }) => theme.color.grey5};
  color: ${({ theme }) => theme.color.black};
  gap: 1rem;
  padding: 0 0.4rem 0 0.4rem;
  margin-bottom: 1.2rem;
`
