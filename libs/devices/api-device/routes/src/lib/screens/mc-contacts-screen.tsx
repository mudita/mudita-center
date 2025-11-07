/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useMemo } from "react"
import { ApiDevice } from "devices/api-device/models"
import { ProgressBar, Typography } from "app-theme/ui"
import {
  useApiDeviceDeleteEntitiesMutation,
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
import { useQueryClient } from "@tanstack/react-query"
import { cloneDeep } from "lodash"

const messages = defineMessages({
  loaderTitle: {
    id: "apiDevice.contacts.loadingState.title",
  },
})

export const McContactsScreen: FunctionComponent = () => {
  const queryClient = useQueryClient()
  const { data: device } = useActiveDeviceQuery<ApiDevice>()
  const { data: feature } = useApiFeatureQuery("mc-contacts", device)
  const { data: contacts, progress } = useApiEntitiesDataQuery<Contact[]>(
    feature?.entityType,
    device
  )

  const { mutateAsync: deleteEntities } =
    useApiDeviceDeleteEntitiesMutation(device)

  const handleDelete = useCallback(
    async (ids: string[]) => {
      if (!feature || !feature.entityType || !device) {
        return { failedIds: ids }
      }

      const { failedIds = [] } = await deleteEntities({
        entityType: feature.entityType,
        ids,
      })
      queryClient.setQueryData(
        useApiEntitiesDataQuery.queryKey(feature.entityType, device.id),
        (oldData: Contact[] = []) => {
          const newData = cloneDeep(oldData)
          return newData.filter((contact) => {
            const aboutToBeDeleted = ids.includes(contact.contactId)
            const failedToDelete = failedIds.includes(contact.contactId)
            const actuallyDeleted = aboutToBeDeleted && !failedToDelete
            return !actuallyDeleted
          })
        }
      )
      return { failedIds }
    },
    [deleteEntities, device, feature, queryClient]
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

  const headerTitle =
    feature && contacts && contacts.length > 0
      ? `${feature.title} (${contacts.length})`
      : feature?.title || "All contacts"

  return (
    <>
      <DashboardHeaderTitle title={headerTitle} />
      {!feature || !contacts ? (
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
      ) : (
        <Content
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Contacts contacts={sortedContacts} onDelete={handleDelete} />
        </Content>
      )}
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
