/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useEffect } from "react"
import { Modal } from "../modal/modal"
import styled, { css } from "styled-components"
import { Typography } from "../typography/typography"
import { IconSize, IconType, ModalLayer } from "app-theme/models"
import { Icon } from "../icon/icon"
import { ImagePreview } from "./image-preview"
import { AnimatePresence, motion } from "motion/react"
import { FilePreviewError, FilePreviewErrorCode } from "./file-preview-error"

export { FilePreviewErrorCode } from "./file-preview-error"

export interface FilePreviewFile {
  id: string
  name: string
  type: string
  path: string
  extension: string
  dataUrl?: string
}

interface Props {
  opened?: boolean
  file?: FilePreviewFile
  filesCount: number
  loading?: boolean
  error?: FilePreviewErrorCode
  onClose: VoidFunction
  onNextFile?: VoidFunction
  onPreviousFile?: VoidFunction
  onDownload?: VoidFunction
  onDelete?: VoidFunction
  onRetry?: VoidFunction
}

export const FilePreview: FunctionComponent<Props> = ({
  opened,
  file,
  filesCount,
  loading,
  error,
  onClose,
  onNextFile,
  onPreviousFile,
  onDownload,
  onDelete,
  onRetry,
}) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault()
          onPreviousFile?.()
          break
        case "ArrowRight":
          event.preventDefault()
          onNextFile?.()
          break
        case "D":
        case "d":
          event.preventDefault()
          onDownload?.()
          break
        case "Delete":
        case "Backspace":
          event.preventDefault()
          onDelete?.()
          break
        case "Escape":
          event.preventDefault()
          onClose()
          break
        default:
          return
      }
    },
    [onClose, onDelete, onDownload, onNextFile, onPreviousFile]
  )

  useEffect(() => {
    if (opened) {
      document.addEventListener("keydown", handleKeyDown)
    } else {
      document.removeEventListener("keydown", handleKeyDown)
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown, opened])

  return (
    <Modal
      opened={opened}
      size={96}
      customStyles={{ maxHeight: "64rem" }}
      layer={ModalLayer.Default - 1}
    >
      <ModalContent>
        <Header>
          <Typography.P1 id={"file-preview-name"} color={"white"}>
            [{file?.id}] {file?.name}
          </Typography.P1>
          <ActionButton onClick={onClose} aria-label="Close file preview">
            <Icon type={IconType.Close} size={IconSize.Big} />
          </ActionButton>
        </Header>
        <Main>
          <AnimatePresence initial={true} mode={"popLayout"}>
            {loading ? (
              <Loader
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Icon type={IconType.Spinner} size={IconSize.AutoMax} />
              </Loader>
            ) : error ? (
              <FilePreviewError
                error={error}
                fileType={file?.extension}
                onClose={onClose}
                onRetry={onRetry}
                key={"error"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            ) : (
              <ContentWrapper
                key={file?.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <ImagePreview key={file?.id} src={file?.dataUrl} />
              </ContentWrapper>
            )}
          </AnimatePresence>
        </Main>
        {filesCount > 1 && (
          <Navigation>
            <NavigationButton
              onClick={onPreviousFile}
              aria-label="Previous file"
            >
              <Icon type={IconType.ArrowLeft} size={IconSize.Big} />
            </NavigationButton>
            <NavigationButton onClick={onNextFile} aria-label="Next file">
              <Icon type={IconType.ArrowRight} size={IconSize.Big} />
            </NavigationButton>
          </Navigation>
        )}
        <Footer>
          {onDownload && (
            <ActionButton onClick={onDownload} aria-label="Download file">
              <Icon type={IconType.Download} size={IconSize.Big} />
            </ActionButton>
          )}
          {onDelete && (
            <ActionButton onClick={onDelete} aria-label="Delete file">
              <Icon type={IconType.Trash} size={IconSize.Big} />
            </ActionButton>
          )}
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

const ActionButton = styled.button`
  appearance: none;
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.app.color.white};
`

const NavigationButton = styled(ActionButton)`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.app.color.grey1};
  display: flex;
  align-items: center;
  justify-content: center;
`

const Header = styled.header`
  ${frameCommonStyles};
  top: 0;
  color: ${({ theme }) => theme.app.color.white};

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
    color: ${({ theme }) => theme.app.color.white} !important;
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
    color: ${({ theme }) => theme.app.color.white} !important;
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

const ModalContent = styled.section`
  position: relative;
  width: 96rem;
  overflow: hidden;
  background-color: ${({ theme }) => theme.app.color.grey0};

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
  background-color: ${({ theme }) => theme.app.color.grey0};
`

const Loader = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 4.8rem;
  height: 4.8rem;
  color: ${({ theme }) => theme.app.color.white};
`

const ContentWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
`
