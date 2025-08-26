/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  FunctionComponent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react"
import styled, { css } from "styled-components"
import { IconType } from "generic-view/utils"
import { Modal } from "../../interactive/modal/modal"
import { IconButton } from "../../shared/button"
import { Icon } from "../../icon/icon"
import { Typography } from "../../typography"
import { SpinnerLoader } from "../../shared/spinner-loader"
import { AnimatePresence, motion } from "motion/react"
import { FilePreviewEntitiesConfig, useFilePreview } from "./use-file-preview"
import { ButtonIcon } from "../../buttons/button-icon"
import { generateFilesExportButtonActions } from "../../generated/mc-file-manager/file-export-button"
import { generateDeleteFilesButtonActions } from "../../generated/mc-file-manager/delete-files"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"
import { defineMessages } from "react-intl"
import { ButtonSecondary } from "../../buttons/button-secondary"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { ImagePreview } from "./image-preview"
import { FilePreviewErrorType } from "./file-preview-error-types"

const messages = defineMessages({
  unsupportedFileType: {
    id: "module.genericViews.filesManager.preview.unsupportedTypeError",
  },
  unknownError: {
    id: "module.genericViews.filesManager.preview.unknownError",
  },
  retryButton: {
    id: "module.genericViews.filesManager.preview.retryButton",
  },
  backButton: {
    id: "module.genericViews.filesManager.preview.backButton",
  },
})

interface Props {
  items: string[]
  initialItem: string | undefined
  opened: boolean
  onActiveItemChange: (item: string | undefined) => void
  onClose: VoidFunction
  componentKey: string
  entitiesConfig: FilePreviewEntitiesConfig
}

export const FilePreview: FunctionComponent<Props> = memo(
  ({
    opened,
    items,
    initialItem,
    onClose,
    onActiveItemChange,
    entitiesConfig,
    componentKey,
  }) => {
    const [currentItemId, setCurrentItemId] = useState(initialItem)
    const [previewLoadingError, setPreviewLoadingError] = useState(false)
    const [entitiesIds, setEntitiesIds] = useState(items)

    const {
      data,
      isLoading,
      isPending,
      isFetching,
      isError,
      error,
      refetch,
      cancel,
      dataUpdatedAt,
      fileName,
      getNextFileId,
      getPrevFileId,
    } = useFilePreview({
      entitiesIds,
      entitiesType: entitiesConfig.type,
      entityId: currentItemId,
      entitiesConfig,
    })

    const inProgress = isLoading || isPending || isFetching
    const hasError = isError || previewLoadingError

    const handleClose = useCallback(() => {
      onClose()
    }, [onClose])

    const handlePreviousFile = useCallback(async () => {
      await cancel()
      setPreviewLoadingError(false)
      setCurrentItemId(getPrevFileId())
    }, [cancel, getPrevFileId])

    const handleNextFile = useCallback(async () => {
      await cancel()
      setPreviewLoadingError(false)
      setCurrentItemId(getNextFileId())
    }, [cancel, getNextFileId])

    const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === "ArrowLeft") {
          void handlePreviousFile()
        } else if (event.key === "ArrowRight") {
          void handleNextFile()
        }
      },
      [handleNextFile, handlePreviousFile]
    )

    const handlePreviewError = useCallback(() => {
      setPreviewLoadingError(true)
    }, [])

    const handleRetry = useCallback(() => {
      setPreviewLoadingError(false)
      void refetch()
    }, [refetch])

    useEffect(() => {
      void (async () => {
        // Open next file preview if current file was deleted
        if (currentItemId && !items.includes(currentItemId)) {
          await handleNextFile()
          setEntitiesIds(items)
        }
      })()
    }, [currentItemId, handleNextFile, items])

    useEffect(() => {
      // Set initial state when opening preview modal
      setCurrentItemId(initialItem)
    }, [initialItem])

    useEffect(() => {
      // Notify parent component about active file change
      onActiveItemChange(currentItemId)
    }, [currentItemId, getNextFileId, onActiveItemChange])

    useEffect(() => {
      if (initialItem) {
        document.addEventListener("keydown", handleKeyDown)
      } else {
        document.removeEventListener("keydown", handleKeyDown)
      }
      return () => {
        document.removeEventListener("keydown", handleKeyDown)
      }
    }, [handleKeyDown, initialItem])

    return (
      <Modal
        componentKey={"file-preview-modal"}
        config={{
          defaultOpened: opened,
          width: 960,
          maxHeight: 640,
          padding: 0,
          modalLayer: ModalLayers.Default - 1,
        }}
      >
        <ModalContent>
          <Header>
            <Typography.P1 config={{ color: "white" }} id={"file-preview-name"}>
              {fileName}
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
          <Main>
            <AnimatePresence initial={true} mode={"popLayout"}>
              {hasError ? (
                <ErrorWrapper
                  key={"error"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ErrorIcon
                    config={{
                      type: IconType.Exclamation,
                      size: "large",
                      color: "white",
                    }}
                  />
                  {error?.type === FilePreviewErrorType.UnsupportedFileType ? (
                    <>
                      <Typography.P1>
                        {intl.formatMessage(messages.unsupportedFileType, {
                          type: error.details,
                        })}
                      </Typography.P1>
                      <ButtonSecondary
                        config={{
                          text: intl.formatMessage(messages.backButton),
                          actions: [
                            {
                              type: "custom",
                              callback: handleClose,
                            },
                          ],
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <Typography.P1>
                        {intl.formatMessage(messages.unknownError)}
                      </Typography.P1>
                      <ButtonSecondary
                        config={{
                          text: intl.formatMessage(messages.retryButton),
                          actions: [
                            {
                              type: "custom",
                              callback: handleRetry,
                            },
                          ],
                        }}
                      />
                    </>
                  )}
                </ErrorWrapper>
              ) : inProgress ? (
                <Loader
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <SpinnerLoader />
                </Loader>
              ) : (
                <PreviewWrapper
                  key={data?.filePath}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {data?.fileType?.startsWith("image") && (
                    <ImagePreview
                      src={
                        data.filePath
                          ? `${data.filePath}?t=${dataUpdatedAt}`
                          : ""
                      }
                      onError={handlePreviewError}
                    />
                  )}
                </PreviewWrapper>
              )}
            </AnimatePresence>
          </Main>
          {items.length > 1 && (
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
          )}
          <Footer>
            <ButtonIcon
              config={{
                icon: IconType.Export,
                iconSize: "large",
                actions: [
                  ...generateFilesExportButtonActions(componentKey, {
                    exportActionId: "previewExport",
                    singleEntityId: currentItemId,
                    entityType: entitiesConfig.type,
                  }),
                ],
              }}
            />
            <ButtonIcon
              config={{
                icon: IconType.Delete,
                iconSize: "large",
                actions: generateDeleteFilesButtonActions(componentKey, {
                  singleEntityId: currentItemId,
                }),
              }}
            />
          </Footer>
        </ModalContent>
      </Modal>
    )
  }
)

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
    filter: drop-shadow(0 1rem 5rem rgba(0, 0, 0, 0.08));
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
    filter: drop-shadow(0 1rem 5rem rgba(0, 0, 0, 0.08));
    transform: rotate(-180deg);
  }

  svg {
    color: ${({ theme }) => theme.color.white} !important;
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
  outline: none;
`

const ModalContent = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.grey0};

  &:hover {
    ${Header}, ${Footer}, ${Navigation} {
      opacity: 1;
      visibility: visible;
    }
  }
`

const Loader = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`

const PreviewWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
`

const ErrorWrapper = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.4rem;
  width: 34rem;

  p {
    color: ${({ theme }) => theme.color.white} !important;
  }

  button {
    margin-top: 1rem;
    background-color: transparent;
    color: ${({ theme }) => theme.color.white};
    border-color: ${({ theme }) => theme.color.white};
    width: 15.6rem;

    &:hover {
      background-color: ${({ theme }) => theme.color.grey1};
    }

    &:active {
      background-color: transparent;
    }
  }
`

const ErrorIcon = styled(Icon)`
  width: 6.8rem;
  height: 6.8rem;
  padding: 1.2rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.white};
`

const Main = styled.main`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 64rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.grey0};
`
