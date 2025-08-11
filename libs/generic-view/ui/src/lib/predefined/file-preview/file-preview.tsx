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
    const nextIdReference = useRef<string>()

    // TODO: Handle file transfer mode
    const fileTransferMode = useSelector(selectFilesTransferMode)

    const {
      data: fileInfo,
      nextId,
      previousId,
    } = useFilesPreview({
      items,
      activeItem,
      entitiesConfig,
    })

    const isLoading = !fileInfo

    const entityType = useMemo(() => {
      if (!entity) return ""
      return entity[entitiesConfig.mimeTypeField] as string
    }, [entitiesConfig.mimeTypeField, entity])

    const entityName = useMemo(() => {
      if (!entity) return ""
      return entity[entitiesConfig.titleField] as string
    }, [entitiesConfig.titleField, entity])

    const handleClose = useCallback(() => {
      onActiveItemChange(undefined)
    }, [onActiveItemChange])

    const handleError = useCallback(() => {
      // TODO: Handle errors
    }, [])

    const handlePreviousFile = useCallback(() => {
      onActiveItemChange(previousId)
    }, [onActiveItemChange, previousId])

    const handleNextFile = useCallback(() => {
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

    useEffect(() => {
      document.addEventListener("keydown", handleKeyDown)
      if (!activeItem) {
        document.removeEventListener("keydown", handleKeyDown)
      }
      return () => {
        document.removeEventListener("keydown", handleKeyDown)
      }
    }, [activeItem, handleKeyDown])

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
            <AnimatePresence initial={true} mode={"wait"}>
              {!isLoading && (
                <PreviewWrapper
                  key={fileInfo?.path}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {entityType.startsWith("image") && (
                    <ImagePreview src={fileInfo.path} onError={handleError} />
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

const PreviewWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
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
