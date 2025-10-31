/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useMemo } from "react"
import { ApiDevice } from "devices/api-device/models"
import { ProgressBar, Typography } from "app-theme/ui"
import {
  useApiEntitiesDataQuery,
  useApiFeatureQuery,
} from "devices/api-device/feature"
import { motion } from "motion/react"
import { useActiveDeviceQuery } from "devices/common/feature"
import styled from "styled-components"
import { DashboardHeaderTitle } from "app-routing/feature"
import { Contacts } from "devices/common/ui"
import { Contact } from "devices/common/models"
import { defineMessages } from "app-localize/utils"

const messages = defineMessages({
  loaderTitle: {
    id: "apiDevice.contacts.loadingState.title",
  },
})

export const McContactsScreen: FunctionComponent = () => {
  const { data: device } = useActiveDeviceQuery<ApiDevice>()
  const { data: feature } = useApiFeatureQuery("mc-contacts", device)
  const { data: contacts, progress } = useApiEntitiesDataQuery<Contact[]>(
    feature?.entityType,
    device
  )

  const sortedContacts = useMemo(() => {
    return (
      contacts?.sort((a, b) => {
        const patterns = [
          /^\p{L}.*/u, // Compare letter values
          /^\d+$/, // Compare numeric values
          /^[^a-zA-Z\d\s@]+$/, // Compare special character values
        ]

        for (const pattern of patterns) {
          const aMatches = pattern.test(a.sortField)
          const bMatches = pattern.test(b.sortField)

          if (aMatches && !bMatches) return -1
          if (!aMatches && bMatches) return 1
        }
        return a.sortField.localeCompare(b.sortField)
      }) || []
    )
  }, [contacts])

  if (!feature || !contacts) {
    return (
      <LoaderWrapper
        key="loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Typography.H3 message={messages.loaderTitle.id} />
        <ProgressBar value={progress} indeterminate={progress === 0} />
      </LoaderWrapper>
    )
  }

  return (
    <>
      <DashboardHeaderTitle title={feature.title} />
      <Content
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Contacts contacts={sortedContacts} />
      </Content>
    </>
  )
}

const LoaderWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const Content = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.app.color.white};
  display: flex;
  flex-direction: row;
  overflow-x: hidden;
`
