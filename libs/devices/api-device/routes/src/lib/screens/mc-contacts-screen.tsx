/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ComponentProps,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { ApiDevice, ApiDevicePaths } from "devices/api-device/models"
import { ProgressBar, Typography } from "app-theme/ui"
import {
  contactsMapper,
  sendEntities,
  useApiDeviceDeleteEntitiesMutation,
  useApiEntitiesDataQuery,
  useApiFeatureQuery,
} from "devices/api-device/feature"
import { motion } from "motion/react"
import {
  detectContactsDuplicates,
  useActiveDeviceQuery,
} from "devices/common/feature"
import styled from "styled-components"
import { DashboardHeaderTitle } from "app-routing/feature"
import { Contacts, ImportState } from "devices/common/ui"
import { Contact } from "devices/common/models"
import { defineMessages, formatMessage } from "app-localize/utils"
import { useQueryClient } from "@tanstack/react-query"
import { cloneDeep } from "lodash"
import { useHelpShortcut } from "help/feature"
import {
  AppActions,
  AppFileSystem,
  ExternalAuthProviders,
} from "app-utils/renderer"
import {
  ExternalAuthProvider,
  ExternalAuthProvidersScope,
} from "app-utils/models"
import path from "node:path"
import { useAppNavigate } from "app-routing/utils"

const messages = defineMessages({
  loaderTitle: {
    id: "apiDevice.contacts.loadingState.title",
  },
  fileDialogTitle: {
    id: "apiDevice.contacts.import.fileDialog.title",
  },
  fileDialogFilterName: {
    id: "apiDevice.contacts.import.fileDialog.filterName",
  },
})

export const McContactsScreen: FunctionComponent = () => {
  const queryClient = useQueryClient()
  const helpShortcut = useHelpShortcut()
  const importAbortController = useRef(new AbortController())
  const navigate = useAppNavigate()

  const { data: device } = useActiveDeviceQuery<ApiDevice>()
  const { data: feature } = useApiFeatureQuery("mc-contacts", device)
  const {
    data: contacts,
    progress,
    refetch,
    isSuccess,
  } = useApiEntitiesDataQuery<Contact[]>(feature?.entityType, device)
  const [dataLoaded, setDataLoaded] = useState(isSuccess)

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

  const handleImportFromFile = useCallback(
    async (onStartImporting?: VoidFunction) => {
      const [filePath] = await AppActions.openFileDialog({
        title: formatMessage(messages.fileDialogTitle),
        filters: [
          {
            name: formatMessage(messages.fileDialogFilterName),
            extensions: ["vcf", "csv"],
          },
        ],
        properties: ["openFile"],
      })
      if (!filePath) {
        return
      }
      onStartImporting?.()

      const file = await AppFileSystem.readFile({
        absolute: true,
        fileAbsolutePath: filePath,
        encoding: "utf-8",
      })
      if (!file.ok) {
        return
      }
      return {
        data: file.data,
        extension: path.extname(filePath).toLowerCase() as ".vcf" | ".csv",
      }
    },
    []
  )

  const handleImportProviderSelect: ComponentProps<
    typeof Contacts
  >["onProviderSelect"] = useCallback(
    async (provider, onStartImporting) => {
      if (provider === "file") {
        const fileData = await handleImportFromFile(onStartImporting)
        if (!fileData) {
          return
        }
        switch (fileData.extension) {
          case ".vcf":
            return contactsMapper.fromVcard(fileData.data)
          case ".csv":
            return contactsMapper.fromCsv(fileData.data)
        }
      }
      if (provider === ExternalAuthProvider.Google) {
        ExternalAuthProviders.listenToScopesDataTransferStart(onStartImporting)
        const response = await ExternalAuthProviders.getScopesData(
          ExternalAuthProvider.Google,
          [ExternalAuthProvidersScope.Contacts]
        )
        if (!response) return
        return contactsMapper.fromGoogleApi(response.contacts)
      }
      if (provider === ExternalAuthProvider.Outlook) {
        ExternalAuthProviders.listenToScopesDataTransferStart(onStartImporting)
        const response = await ExternalAuthProviders.getScopesData(
          ExternalAuthProvider.Outlook,
          [ExternalAuthProvidersScope.Contacts]
        )
        if (!response) return
        return contactsMapper.fromOutlookApi(response.contacts)
      }
      return
    },
    [handleImportFromFile]
  )

  const handleImport: ComponentProps<typeof Contacts>["onImport"] = useCallback(
    async (contacts, onProgress) => {
      if (!device) {
        return { failed: true }
      }
      importAbortController.current = new AbortController()
      let sendingProgress = 0
      let refetchingProgress = 0

      const handleTotalProgress = () => {
        const totalProgress = sendingProgress * 0.6 + refetchingProgress * 0.4
        const importState =
          sendingProgress < 100
            ? ImportState.Transferring
            : ImportState.Refreshing
        onProgress(Math.floor(totalProgress), importState)
      }

      const response = await sendEntities({
        device,
        entityType: "contacts",
        mode: "file",
        data: contacts,
        onProgress: (progress) => {
          sendingProgress = progress
          handleTotalProgress()
        },
        abortController: importAbortController.current,
      })

      if (response?.failedEntities?.length) {
        return { failed: true }
      }
      if (importAbortController.current.signal.aborted) {
        void refetch()
        return { cancelled: true }
      }

      await refetch({
        onProgress: (progress) => {
          refetchingProgress = progress
          handleTotalProgress()
        },
      })
      onProgress(100, ImportState.Refreshing)

      const newContacts =
        queryClient.getQueryData<Contact[]>(
          useApiEntitiesDataQuery.queryKey("contacts", device.id)
        ) || []

      const duplicates = detectContactsDuplicates(newContacts)

      return {
        duplicatesCount: duplicates.length,
      }
    },
    [device, queryClient, refetch]
  )

  const handleImportCancel = useCallback(() => {
    importAbortController.current.abort()
  }, [])

  const handleManageDuplicates = useCallback(() => {
    navigate(`${ApiDevicePaths.Index}/mc-contacts/mc-contacts-duplicates`)
  }, [navigate])

  const handleImportHelpClick = useCallback(() => {
    helpShortcut("kompakt-contacts-import")
  }, [helpShortcut])

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

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (isSuccess) {
      timeout = setTimeout(() => {
        setDataLoaded(true)
      }, 450)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [isSuccess])

  if (!feature || !contacts || !dataLoaded) {
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
    contacts.length > 0
      ? `${feature.title} (${contacts.length})`
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
        <Contacts
          contacts={sortedContacts}
          onDelete={handleDelete}
          onProviderSelect={handleImportProviderSelect}
          onImport={handleImport}
          onImportCancel={handleImportCancel}
          onManageDuplicates={handleManageDuplicates}
          onHelpClick={handleImportHelpClick}
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
  flex-direction: row;
  overflow-x: hidden;
`
