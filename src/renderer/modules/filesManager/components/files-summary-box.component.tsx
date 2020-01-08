import { shell } from "electron"
import React from "react"
import Svg from "Renderer/components/core/svg/svg.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { FilesManagerData } from "Renderer/models/files-manager/files-manager.interface"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const Wrapper = styled.div<{ borderColor: string }>`
  display: flex;
  align-items: center;
  //width: 19.1rem;
  background-color: ${backgroundColor("light")};
  border-left: 0.3rem solid ${({ borderColor }) => borderColor};
`

const convertBytes = (bytes: number): string => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]

  if (bytes === 0) {
    return "n/a"
  }

  const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))), 10)

  if (i === 0) {
    return bytes + " " + sizes[i]
  }

  return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i]
}

const Icon = styled(Svg)`
  margin: 1.9rem 2.4rem;
`

const TextWrapper = styled.div`
  margin-right: 3.2rem;
`

const FilesManagerItem: FunctionComponent<FilesManagerData> = ({
  color,
  filesAmount,
  filesType,
  occupiedMemory,
  icon,
  url,
  dirPath,
}) => {
  const openDirectory = () =>
    shell.showItemInFolder("/Users/kamilstaszewski/Projekty/")
  const handleOpenDirectory = (event: React.MouseEvent<HTMLElement>) => {
    if (Boolean(dirPath)) {
      openDirectory()
    }
  }
  return (
    <Wrapper borderColor={color} onClick={handleOpenDirectory}>
      <Icon Image={icon} />
      <TextWrapper>
        <Text displayStyle={TextDisplayStyle.LargeText} element={"p"}>
          {filesType}
        </Text>
        <Text displayStyle={TextDisplayStyle.SmallFadedText} element={"p"}>
          {filesAmount} files ({convertBytes(occupiedMemory)})
        </Text>
      </TextWrapper>
    </Wrapper>
  )
}

export default FilesManagerItem
