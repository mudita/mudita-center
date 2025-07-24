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
import { Modal } from "../interactive/modal/modal"
import { IconButton } from "../shared/button"
import { Icon } from "../icon/icon"
import { IconType } from "generic-view/utils"
import { useFilesPreview } from "./use-file-preview"
import { Typography } from "../typography"
import { SpinnerLoader } from "../shared/spinner-loader"
import { useSelector } from "react-redux"
import { selectFilesTransferMode } from "generic-view/store"

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
  // TODO: Handle file transfer mode
  const fileTransferMode = useSelector(selectFilesTransferMode)
  const srcTimeoutReference = useRef<NodeJS.Timeout>()
  const [isSrcLoading, setIsSrcLoading] = useState(true)

  const {
    data: fileInfo,
    isLoading: isFileLoading,
    nextId,
    previousId,
  } = useFilesPreview({
    items,
    activeItem,
    entitiesConfig,
  })
  console.log(fileInfo?.path, isFileLoading)
  const isLoading = isFileLoading || isSrcLoading

  const handleSrcLoad = useCallback(() => {
    clearTimeout(srcTimeoutReference.current)
    srcTimeoutReference.current = setTimeout(() => {
      setIsSrcLoading(false)
    }, 500)
  }, [])

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

  const handlePreviousFile = useCallback(() => {
    onActiveItemChange(previousId)
    setIsSrcLoading(true)
  }, [onActiveItemChange, previousId])

  const handleNextFile = useCallback(() => {
    onActiveItemChange(nextId)
    setIsSrcLoading(true)
  }, [nextId, onActiveItemChange])

  useEffect(() => {
    // If the active item is not in the list, go to the next item
    if (activeItem && !items.includes(activeItem)) {
      handleNextFile()
    }
  }, [activeItem, handleNextFile, items])

  return (
    <>
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
              {fileInfo?.name}
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
          <Main $loading={isLoading}>
            <BackgroundImage $url={isLoading ? undefined : fileInfo?.path} />
            <Loader>
              <SpinnerLoader />
            </Loader>
            <Image
              alt={""}
              src={isFileLoading ? undefined : fileInfo?.path}
              onLoad={handleSrcLoad}
              onError={() => {
                // setIsError(true)
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
    </>
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
  background-color: ${({ theme }) => theme.color.grey0};

  &:hover {
    ${Header}, ${Footer}, ${Navigation} {
      opacity: 1;
      visibility: visible;
    }
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  margin: 0;
  position: relative;
  z-index: 1;

  opacity: 0;
  transition: opacity 0.15s ease-in-out;
`
// opacity: ${({ $visible }) => ($visible ? 1 : 0)};

const BackgroundImage = styled.div<{ $url?: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;

  background-image: url("${({ $url }) => $url}");
  background-position: center;
  background-size: cover;
  filter: blur(5rem) brightness(0.4);

  opacity: 0;
  transition: opacity 0.15s ease-in-out;
`

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;

  opacity: 1;
  transition: opacity 0.15s ease-in-out;

  //transition: opacity 0.15s ease-in-out;
`
// opacity: ${({ $visible }) => ($visible ? 1 : 0)};

const Main = styled.main<{ $loading: boolean }>`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 64rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.grey0};

  ${({ $loading }) =>
    $loading
      ? css`
          ${Image}, ${BackgroundImage} {
            opacity: 0;
          }
          ${Loader} {
            opacity: 1;
          }
        `
      : css`
          ${Image}, ${BackgroundImage} {
            opacity: 1;
          }
          ${Loader} {
            opacity: 0;
          }
        `}
`
