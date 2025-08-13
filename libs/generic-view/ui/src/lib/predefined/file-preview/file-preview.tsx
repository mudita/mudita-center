/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  FunctionComponent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useSelector } from "react-redux"
import styled, { css } from "styled-components"
import { selectEntityData, selectFilesTransferMode } from "generic-view/store"
import { IconType } from "generic-view/utils"
import { Modal } from "../../interactive/modal/modal"
import { IconButton } from "../../shared/button"
import { Icon } from "../../icon/icon"
import { Typography } from "../../typography"
import { SpinnerLoader } from "../../shared/spinner-loader"
import { ImagePreview } from "./image-preview"
import { AnimatePresence, motion } from "motion/react"
import { useFilesPreview, UseFilesPreviewParams } from "./use-files-preview"
import { activeDeviceIdSelector } from "active-device-registry/feature"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ButtonIcon } from "../../buttons/button-icon"
import { generateFilesExportButtonActions } from "../../generated/mc-file-manager/file-export-button"
import { generateDeleteFilesButtonActions } from "../../generated/mc-file-manager/delete-files"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"
import {
  FilePreviewError,
  FilePreviewErrorType,
} from "./file-preview-error.types"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { ButtonSecondary } from "../../buttons/button-secondary"

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
  componentKey: string
  entitiesConfig: UseFilesPreviewParams["entitiesConfig"]
  items: string[]
  activeItem: string | undefined
  onActiveItemChange: (item: string | undefined) => void
  actions?: React.ReactNode
}

export const FilePreview: FunctionComponent<Props> = memo(
  ({ items, activeItem, onActiveItemChange, entitiesConfig, componentKey }) => {
    const deviceId = useSelector(activeDeviceIdSelector)
    const entity = useSelector((state: ReduxRootState) => {
      if (!activeItem || !deviceId) return undefined
      return selectEntityData(state, {
        deviceId,
        entitiesType: entitiesConfig.type,
        entityId: activeItem,
      })
    })
    const fileTransferMode = useSelector(selectFilesTransferMode)
    const nextIdReference = useRef<string>()

    const {
      data: fileInfo,
      nextId,
      previousId,
      refetch,
      isLoading,
    } = useFilesPreview({
      items,
      activeItem,
      entitiesConfig,
    })
    const [error, setError] = useState<FilePreviewError>()
    const isLoaded = !isLoading

    console.log({ fileTransferMode })
    const entityType = useMemo(() => {
      if (!entity) return ""
      return entity[entitiesConfig.mimeTypeField] as string
    }, [entitiesConfig.mimeTypeField, entity])

    const entityName = useMemo(() => {
      if (!entity) return ""
      return entity[entitiesConfig.titleField] as string
    }, [entitiesConfig.titleField, entity])

    const handleClose = useCallback(() => {
      setError(undefined)
      onActiveItemChange(undefined)
    }, [onActiveItemChange])

    const handlePreviousFile = useCallback(() => {
      setError(undefined)
      onActiveItemChange(previousId)
    }, [onActiveItemChange, previousId])

    const handleNextFile = useCallback(() => {
      setError(undefined)
      onActiveItemChange(nextIdReference.current || nextId)
    }, [nextId, onActiveItemChange])

    const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === "ArrowLeft") {
          handlePreviousFile()
        } else if (event.key === "ArrowRight") {
          handleNextFile()
        }
      },
      [handleNextFile, handlePreviousFile]
    )

    const handleRetry = useCallback(async () => {
      if (!activeItem) return
      refetch()
      setError(undefined)
    }, [activeItem, refetch])

    const previewError = useMemo(() => {
      return (
        <ErrorWrapper $visible={!!error && !isLoading}>
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
      )
    }, [error, handleClose, handleRetry, isLoading])

    useEffect(() => {
      document.addEventListener("keydown", handleKeyDown)
      if (!activeItem) {
        document.removeEventListener("keydown", handleKeyDown)
      }
      return () => {
        document.removeEventListener("keydown", handleKeyDown)
      }
    }, [activeItem, handleKeyDown])

    useEffect(() => {
      if (fileTransferMode !== "mtp") {
        setError({
          type: FilePreviewErrorType.UnsupportedTransferType,
        })
      } else if (error?.type === FilePreviewErrorType.UnsupportedTransferType) {
        setError(undefined)
      }
    }, [error?.type, fileTransferMode])

    useEffect(() => {
      if (!activeItem) {
        setError(undefined)
      }
    }, [activeItem])

    return (
      <Modal
        componentKey={"file-preview-modal"}
        config={{
          defaultOpened: Boolean(activeItem),
          width: 960,
          maxHeight: 640,
          padding: 0,
          modalLayer: ModalLayers.Default - 1,
        }}
      >
        <ModalContent>
          <Header>
            <Typography.P1 config={{ color: "white" }}>
              {entityName}
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
            <Loader>
              <SpinnerLoader />
            </Loader>
            <PreviewWrapper $visible={isLoaded && !error}>
              {entityType.startsWith("image") && (
                <ImagePreview src={fileInfo?.path} onError={setError} />
              )}
            </PreviewWrapper>
            {previewError}
            {/*{error && (*/}
            {/*  <>*/}
            {/*    <ErrorIcon*/}
            {/*      config={{*/}
            {/*        type: IconType.Exclamation,*/}
            {/*        size: "large",*/}
            {/*        color: "white",*/}
            {/*      }}*/}
            {/*    />*/}
            {/*    {error?.type === FilePreviewErrorType.UnsupportedFileType ? (*/}
            {/*      <>*/}
            {/*        <Typography.P1>*/}
            {/*          {intl.formatMessage(messages.unsupportedFileType, {*/}
            {/*            type: error.details,*/}
            {/*          })}*/}
            {/*        </Typography.P1>*/}
            {/*        <ButtonSecondary*/}
            {/*          config={{*/}
            {/*            text: intl.formatMessage(messages.backButton),*/}
            {/*            actions: [*/}
            {/*              {*/}
            {/*                type: "custom",*/}
            {/*                callback: handleClose,*/}
            {/*              },*/}
            {/*            ],*/}
            {/*          }}*/}
            {/*        />*/}
            {/*      </>*/}
            {/*    ) : (*/}
            {/*      <>*/}
            {/*        <Typography.P1>*/}
            {/*          {intl.formatMessage(messages.unknownError)}*/}
            {/*        </Typography.P1>*/}
            {/*        <ButtonSecondary*/}
            {/*          config={{*/}
            {/*            text: intl.formatMessage(messages.retryButton),*/}
            {/*            actions: [*/}
            {/*              {*/}
            {/*                type: "custom",*/}
            {/*                callback: handleRetry,*/}
            {/*              },*/}
            {/*            ],*/}
            {/*          }}*/}
            {/*        />*/}
            {/*      </>*/}
            {/*    )}*/}
            {/*  </>*/}
            {/*)}*/}
            {/*<AnimatePresence initial={true} mode={"wait"}>*/}
            {/*{!error && (*/}
            {/*  <PreviewWrapper*/}
            {/*    key={fileInfo?.path}*/}
            {/*    initial={{ opacity: 0 }}*/}
            {/*    animate={{ opacity: 1 }}*/}
            {/*    exit={{ opacity: 0 }}*/}
            {/*    transition={{ duration: 0.5 }}*/}
            {/*  >*/}
            {/*    {entityType.startsWith("image") && (*/}
            {/*      <ImagePreview src={fileInfo?.path} onError={setError} />*/}
            {/*    )}*/}
            {/*  </PreviewWrapper>*/}
            {/*)}*/}
            {/*</AnimatePresence>*/}
            {/*<AnimatePresence initial={true} mode={"wait"}>*/}
            {/*  {!!error && (*/}
            {/*    <ErrorWrapper*/}
            {/*      key={fileInfo?.path}*/}
            {/*      initial={{ opacity: 0 }}*/}
            {/*      animate={{ opacity: 1 }}*/}
            {/*      exit={{ opacity: 0 }}*/}
            {/*      transition={{ duration: 0.5 }}*/}
            {/*    >*/}
            {/*     */}
            {/*    </ErrorWrapper>*/}
            {/*  )}*/}
            {/*</AnimatePresence>*/}
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
                    singleEntityId: activeItem,
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
                  singleEntityId: activeItem,
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

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`

const PreviewWrapper = styled.div<{ $visible?: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
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

const ErrorWrapper = styled.div<{ $visible?: boolean }>`
  background-color: ${({ theme }) => theme.color.grey0};
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
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;

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
