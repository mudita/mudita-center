/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import styled, { css } from "styled-components"
import { AppDispatch } from "Core/__deprecated__/renderer/store"
import { Modal } from "../interactive/modal/modal"
import { IconButton } from "../shared/button"
import { Icon } from "../icon/icon"
import { IconType } from "generic-view/utils"
import { useFileEntityInfo } from "./use-file-entity-info"
import { Typography } from "../typography"
import {
  FileWithPath,
  selectFilesTransferMode,
  sendFiles,
  sendFilesClear,
} from "generic-view/store"
import { useDispatch, useSelector } from "react-redux"
import {
  isMtpPathInternal,
  sliceMtpPaths,
} from "../buttons/button-base/file-transfer-paths-helper"
import { validateFilesToExport } from "../shared/validate-files-to-export"
import { SendFilesAction } from "../../../../store/src/lib/file-transfer/files-transfer.type"
import { checkPath, getAppPath, removeDirectory } from "system-utils/feature"

interface Props {
  entitiesConfig: {
    type: string
    idField: string
    pathField: string
  }
  items: string[]
  activeItem: string | undefined
  onActiveItemChange: (item: string | undefined) => void
  onFileExport?: (item: string) => void
  onFileDelete?: (item: string) => void
}

export const FilePreview: FunctionComponent<Props> = ({
  items,
  activeItem,
  onActiveItemChange,
  entitiesConfig,
  onFileExport,
  onFileDelete,
}) => {
  const getFileAbortReference = useRef<VoidFunction>()
  const ACTION_ID = `${entitiesConfig.type}Preview`

  const dispatch = useDispatch<AppDispatch>()
  const fileTransferMode = useSelector(selectFilesTransferMode)
  const fileInfo = useFileEntityInfo({
    id: activeItem,
    type: entitiesConfig.type,
    pathField: entitiesConfig.pathField,
  })
  const [tempDirectoryPath, setTempDirectoryPath] = useState<string>()
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [imageSrc, setImageSrc] = useState("")

  const currentIndexRef = useRef(items.indexOf(activeItem || ""))

  const handleClose = () => {
    onActiveItemChange(undefined)
  }

  const handleExport = useCallback(() => {
    if (!activeItem) return
    onFileExport?.(activeItem)
  }, [activeItem, onFileExport])

  const handleDelete = useCallback(() => {
    if (!activeItem) return
    onFileDelete?.(activeItem)
  }, [activeItem, onFileDelete])

  const handleNextFile = useCallback(() => {
    const nextIndex = (currentIndexRef.current + 1) % items.length
    onActiveItemChange(items[nextIndex])
  }, [items, onActiveItemChange])

  const handlePreviousFile = useCallback(() => {
    const previousIndex =
      (currentIndexRef.current - 1 + items.length) % items.length
    onActiveItemChange(items[previousIndex])
  }, [items, onActiveItemChange])

  const getFile = useCallback(async () => {
    getFileAbortReference.current?.()

    setImageSrc("")
    setIsError(false)
    setIsLoading(true)

    if (
      fileTransferMode !== "mtp" ||
      !activeItem ||
      !fileInfo ||
      !tempDirectoryPath
    ) {
      setIsError(true)
      setIsLoading(false)
      return
    }

    await checkPath(tempDirectoryPath, true)

    const exportFilesData: FileWithPath[] = [
      {
        id: String(activeItem),
        path: sliceMtpPaths(
          fileInfo.filePath as string,
          fileInfo.isInternal as boolean
        ),
        name: String(fileInfo.fileName),
        size: Number(fileInfo.fileSize),
        groupId: ACTION_ID,
      },
    ]

    const validationError = await validateFilesToExport(
      exportFilesData,
      tempDirectoryPath
    )

    if (validationError !== undefined) {
      setIsLoading(false)
      setIsError(true)
    }

    const promise = dispatch(
      sendFiles({
        files: exportFilesData,
        destinationPath: tempDirectoryPath,
        actionId: ACTION_ID,
        entitiesType: entitiesConfig.type,
        isMtpPathInternal: isMtpPathInternal(fileInfo.filePath as string),
        actionType: SendFilesAction.ActionExport,
      })
    ) as unknown as ReturnType<ReturnType<typeof sendFiles>>

    getFileAbortReference.current = (
      promise as unknown as {
        abort: VoidFunction
      }
    ).abort

    const response = await promise

    if (response.meta.requestStatus === "rejected") {
      setIsError(true)
      setIsLoading(false)
      return
    }

    setImageSrc(
      `safe-file://${tempDirectoryPath}/${fileInfo.fileName as string}`
    )
  }, [
    ACTION_ID,
    activeItem,
    dispatch,
    entitiesConfig.type,
    fileInfo,
    fileTransferMode,
    tempDirectoryPath,
  ])

  const clearPreviewData = useCallback(async () => {
    console.log("clear")
    if (!activeItem) {
      dispatch(sendFilesClear({ groupId: ACTION_ID }))
    }
    const destinationPath = await getAppPath("filePreview")
    if (destinationPath.ok) {
      void removeDirectory(destinationPath.data)
    }
  }, [ACTION_ID, activeItem, dispatch])

  useEffect(() => {
    void (async () => {
      const destinationPath = await getAppPath("filePreview")
      if (destinationPath.ok) {
        setTempDirectoryPath(destinationPath.data)
      }
    })()
  }, [])

  useEffect(() => {
    if (activeItem && items.includes(activeItem)) {
      currentIndexRef.current = items.indexOf(activeItem)
      void getFile()
    }
  }, [activeItem, getFile, items])

  useEffect(() => {
    // If the active item is not in the list, go to the next item
    if (activeItem && !items.includes(activeItem)) {
      handleNextFile()
    }
  }, [activeItem, handleNextFile, items])

  useEffect(() => {
    if (!activeItem) {
      void clearPreviewData()
    }
  }, [activeItem, clearPreviewData])

  return (
    <Modal
      componentKey={"file-preview-modal"}
      config={{
        defaultOpened: Boolean(activeItem),
        width: 960,
        maxHeight: 640,
        padding: 0,
      }}
    >
      <ModalContent>
        <Header>
          <Typography.P1 config={{ color: "white" }}>
            {fileInfo?.fileName as string}
          </Typography.P1>
          <IconButton onClick={handleClose}>
            <Icon
              config={{
                type: IconType.Close,
                size: "tiny",
                color: "white",
              }}
            />
          </IconButton>
        </Header>
        <Main
          style={{
            backgroundImage: `url("${imageSrc}")`,
          }}
        >
          <Loader $visible={isLoading}>
            <Typography.P1 config={{ color: "white" }}>
              Loading...
            </Typography.P1>
          </Loader>
          <Image
            alt={""}
            // src={imageSrc}
            onLoad={() => {
              console.log("Image loaded")
              setIsLoading(false)
            }}
            onError={() => {
              console.log("Image load error")
            }}
          />
        </Main>
        <Navigation>
          <NavigationButton onClick={handlePreviousFile}>
            <Icon
              config={{
                type: IconType.ArrowLeft,
                size: "large",
                color: "white",
              }}
            />
          </NavigationButton>
          <NavigationButton onClick={handleNextFile}>
            <Icon
              config={{
                type: IconType.ArrowRight,
                size: "large",
                color: "white",
              }}
            />
          </NavigationButton>
        </Navigation>
        <Footer>
          <IconButton onClick={handleExport}>
            <Icon
              config={{
                type: IconType.Export,
                size: "large",
                color: "white",
              }}
            />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <Icon
              config={{
                type: IconType.Delete,
                size: "large",
                color: "white",
              }}
            />
          </IconButton>
        </Footer>
      </ModalContent>
    </Modal>
  )
}

const frameCommonStyles = css`
  position: absolute;
  z-index: 3;
  width: 100%;
  height: 8rem;
  left: 0;
  padding: 0 2.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 2.4rem;

  opacity: 0;
  visibility: hidden;
  transition-property: opacity, visibility;
  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;

  &:before {
    content: "";
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
  }
`

const Header = styled.header`
  ${frameCommonStyles};
  top: 0;

  &:before {
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.34) 100%
    );
    filter: drop-shadow(0px 10px 50px rgba(0, 0, 0, 0.08));
  }

  p {
    flex: 1;
    color: ${({ theme }) => theme.color.white} !important;
    text-align: left !important;
  }
`

const Footer = styled.footer`
  ${frameCommonStyles};
  bottom: 0;

  &:before {
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0) -2.5%,
      rgba(0, 0, 0, 0.34) 100%
    );
    filter: drop-shadow(0px 10px 50px rgba(0, 0, 0, 0.08));
    transform: rotate(-180deg);
  }
`

const Navigation = styled.nav`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  padding: 0 2.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  opacity: 0;
  visibility: hidden;
  transition-property: opacity, visibility;
  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;
`

const NavigationButton = styled.button`
  cursor: pointer;
  appearance: none;
  border: none;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.grey1};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
`

const ModalContent = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &:hover {
    ${Header}, ${Footer}, ${Navigation} {
      opacity: 1;
      visibility: visible;
    }
  }
`

const Main = styled.main`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 64rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-position: center;
  background-size: cover;
  background-color: ${({ theme }) => theme.color.grey0};
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  margin: 0;

  backdrop-filter: blur(5rem);
  background-color: rgba(0, 0, 0, 0.6);
`

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;

  p {
    color: ${({ theme }) => theme.color.white} !important;
    font-size: 2rem;
    text-align: center;
  }
`
