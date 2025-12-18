/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useMemo, useState } from "react"
import { ApiDevice } from "devices/api-device/models"
import {
  createToastContent,
  ProgressBar,
  Typography,
  useToastContext,
} from "app-theme/ui"
import {
  deleteEntities,
  updateEntities,
  useApiEntitiesDataQuery,
  useApiFeatureQuery,
} from "devices/api-device/feature"
import { motion } from "motion/react"
import {
  detectContactsDuplicates,
  mergeContactsDuplicates,
  useActiveDeviceQuery,
} from "devices/common/feature"
import styled from "styled-components"
import { DashboardHeaderTitle } from "app-routing/feature"
import {
  Contact,
  ContactId,
  ContactToImportAsEntity,
  DuplicateContactsGroup,
} from "devices/common/models"
import { defineMessages, formatMessage } from "app-localize/utils"
import { ContactsDuplicates } from "devices/common/ui"
import { useQueryClient } from "@tanstack/react-query"
import { IconType } from "app-theme/models"

const messages = defineMessages({
  loaderTitle: {
    id: "apiDevice.contacts.loadingState.title",
  },
  toastSuccess: {
    id: "apiDevice.contacts.duplicates.toast.success",
  },
  toastFailure: {
    id: "apiDevice.contacts.duplicates.toast.failure",
  },
})

export const McContactsDuplicatesScreen: FunctionComponent = () => {
  const queryClient = useQueryClient()
  const { addToast } = useToastContext()

  const { data: device } = useActiveDeviceQuery<ApiDevice>()
  const { data: feature } = useApiFeatureQuery("mc-contacts-duplicates", device)
  const { data: contacts, progress } = useApiEntitiesDataQuery<Contact[]>(
    "contacts",
    device
  )
  const [merging, setMerging] = useState(false)

  const duplicates: DuplicateContactsGroup[] = useMemo(() => {
    if (!contacts) {
      return []
    }
    const duplicatesList = detectContactsDuplicates(contacts || [])

    return duplicatesList
      .map(({ toKeep, toMerge }) => ({
        toKeep: contacts.find(
          (contact) => contact.contactId === toKeep
        ) as Contact,
        toMerge: toMerge.map((contactId) =>
          contacts.find((contact) => contact.contactId === contactId)
        ) as Contact[],
      }))
      .sort((a, b) => {
        const nameA = a.toKeep.sortField
        const nameB = b.toKeep.sortField
        return nameA.localeCompare(nameB)
      })
  }, [contacts])

  const mergeContacts = useCallback(
    async (groups: DuplicateContactsGroup[]) => {
      if (!device) {
        return
      }
      setMerging(true)
      const { toUpdate, toRemove } = mergeContactsDuplicates(groups)

      const { failedIds: notUpdated } = await updateEntities({
        device,
        entities: toUpdate.map(
          (contact): ContactToImportAsEntity & { entityId: ContactId } => {
            const {
              displayName1,
              displayName2,
              displayName3,
              displayName4,
              searchName,
              sortField,
              ...rest
            } = contact
            return {
              ...rest,
              entityId: contact.contactId,
              entityType: "contacts",
              phoneNumbers:
                contact.phoneNumbers?.map((p) => ({
                  phoneNumber: p.phoneNumber,
                  phoneType: p.phoneType,
                })) ?? [],
              emailAddresses:
                contact.emailAddresses?.map((e) => ({
                  emailAddress: e.emailAddress,
                  emailType: e.emailType,
                })) ?? [],
            }
          }
        ),
      })
      const deleteResponse = await deleteEntities(device, {
        entityType: "contacts",
        ids: toRemove,
      })

      await queryClient.invalidateQueries({
        queryKey: useApiEntitiesDataQuery.queryKey("contacts", device.id),
      })

      setMerging(false)

      if (
        !deleteResponse.ok ||
        deleteResponse.body.failedIds ||
        notUpdated.length
      ) {
        addToast(
          createToastContent({
            text: formatMessage(messages.toastFailure),
            icon: IconType.Failed,
          })
        )
      } else {
        addToast(
          createToastContent({
            text: formatMessage(messages.toastSuccess),
            icon: IconType.Confirm,
          })
        )
      }
    },
    [addToast, device, queryClient]
  )

  const handleMergeAll = useCallback(async () => {
    await mergeContacts(duplicates)
  }, [duplicates, mergeContacts])

  const handleMerge = useCallback(
    async (toKeepId: Contact["contactId"]) => {
      const groups = duplicates.filter(
        (group) => group.toKeep.contactId === toKeepId
      )
      await mergeContacts(groups)
    },
    [duplicates, mergeContacts]
  )

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

  const headerTitle =
    duplicates.length > 0
      ? `${feature.title} (${duplicates.length})`
      : feature.title

  return (
    <>
      <DashboardHeaderTitle title={headerTitle} />
      <Content
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <ContactsDuplicates
          contacts={duplicates}
          onMerge={handleMerge}
          onMergeAll={handleMergeAll}
          loading={merging}
        />
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
  flex-direction: column;
`
