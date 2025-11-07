/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { DashboardHeaderTitle } from "app-routing/feature"
import { ApiDevice } from "devices/api-device/models"
import { AppResultFactory } from "app-utils/models"
import {
  useActiveDeviceQuery,
  useManageFilesSelection,
} from "devices/common/feature"
import {
  FileTransferResult,
  ManageFiles2,
  manageFilesMessages,
  ManageFilesViewProps,
} from "devices/common/ui"
import { useApiDeviceDeleteEntitiesMutation } from "devices/api-device/feature"
import { deviceManageFilesMessages } from "./device-manage-files.messages"
import { useDeviceManageFiles } from "./use-device-manage-files"
import {
  DeviceManageFileFeature,
  DeviceManageFileFeatureId,
} from "./device-manage-files.types"
import { ProgressBar, Typography } from "app-theme/ui"
import styled from "styled-components"
import { motion } from "motion/react"
import { Navigate, useParams } from "react-router"
import { List } from "./list"
import { OTHER_FILES_LABEL_TEXTS } from "./device-manage-files.config"

export const DeviceManageFilesScreen: FunctionComponent & {
  List: typeof List
} = () => {
  const { feature, category } = useParams<{
    feature: string
    category?: string
  }>()
  const { data: device } = useActiveDeviceQuery<ApiDevice>()
  const {
    isLoading,
    segments,
    categories,
    categoryFileMap,
    freeSpaceBytes,
    usedSpaceBytes,
    otherSpaceBytes,
    refetch,
    progress,
  } = useDeviceManageFiles(feature as DeviceManageFileFeatureId, device)

  console.log({
    segments,
    categories,
    categoryFileMap,
    freeSpaceBytes,
    usedSpaceBytes,
    otherSpaceBytes,
  })

  // const { mutateAsync: deleteFilesMutate } =
  //   useApiDeviceDeleteEntitiesMutation(device)

  // const { activeCategoryId, setActiveCategoryId, activeFileMap } =
  //   useManageFilesSelection({ categories, categoryFileMap })

  const summaryHeader =
    feature === DeviceManageFileFeature.Internal
      ? deviceManageFilesMessages.internalSummaryHeader
      : deviceManageFilesMessages.externalSummaryHeader

  // const addFileButtonText =
  //   activeCategoryId === "applicationFiles"
  //     ? deviceManageFilesMessages.addAppFileButtonText
  //     : manageFilesMessages.addFileButtonText

  const messages = {
    ...deviceManageFilesMessages,
    summaryHeader,
    // addFileButtonText,
  }

  // const transferFile: ManageFilesViewProps["transferFile"] = async (
  //   _params
  // ): Promise<FileTransferResult> => {
  //   // TODO: Implement file transfer logic here
  //   return AppResultFactory.success<FileTransferResult>()
  // }
  //
  // const deleteFiles: ManageFilesViewProps["deleteFiles"] = async (
  //   ids: string[]
  // ): Promise<{ failedIds: string[] }> => {
  //   const { failedIds = [] } = await deleteFilesMutate({
  //     entityType: activeCategoryId,
  //     ids,
  //   })
  //   return { failedIds }
  // }

  console.log({ categories })
  return (
    <>
      <DashboardHeaderTitle title={"Manage Files"} />
      {!feature || isLoading ? (
        <LoaderWrapper
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Typography.H3 message={messages.loadStateText.id} />
          <ProgressBar value={progress} indeterminate={progress === 0} />
        </LoaderWrapper>
      ) : (
        <>
          {!category && categories && <Navigate to={categories[0].id} />}
          <Content
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ManageFiles2
              segments={segments}
              categories={categories}
              freeSpaceBytes={freeSpaceBytes}
              usedSpaceBytes={usedSpaceBytes}
              otherSpaceBytes={otherSpaceBytes}
              otherFiles={OTHER_FILES_LABEL_TEXTS}
              messages={messages}
            />
            {/*<ManageFiles*/}
            {/*  activeCategoryId={activeCategoryId}*/}
            {/*  activeFileMap={activeFileMap}*/}
            {/*  onActiveCategoryChange={setActiveCategoryId}*/}
            {/*  segments={segments}*/}
            {/*  categories={categories}*/}
            {/*  freeSpaceBytes={freeSpaceBytes}*/}
            {/*  usedSpaceBytes={usedSpaceBytes}*/}
            {/*  otherSpaceBytes={otherSpaceBytes}*/}
            {/*  deleteFiles={deleteFiles}*/}
            {/*  onDeleteSuccess={refetch}*/}
            {/*  otherFiles={OTHER_FILES_LABEL_TEXTS}*/}
            {/*  openFileDialog={openFileDialog}*/}
            {/*  transferFile={transferFile}*/}
            {/*  messages={messages}*/}
            {/*  onTransferSuccess={refetch}*/}
            {/*>*/}
            {/*  {(props) => (*/}
            {/*    <DeviceManageFilesTableSection*/}
            {/*      fileMap={activeFileMap}*/}
            {/*      {...props}*/}
            {/*    />*/}
            {/*  )}*/}
            {/*</ManageFiles>*/}
          </Content>
        </>
      )}
    </>
  )
}

DeviceManageFilesScreen.List = List

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
