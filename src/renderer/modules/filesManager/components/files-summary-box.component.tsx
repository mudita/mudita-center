import React from "react"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { FilesManagerData } from "Renderer/models/files-manager/files-manager.interface"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const Wrapper = styled.div<{ borderColor: string }>`
  width: 19.1rem;
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

const FilesManagerItem: FunctionComponent<FilesManagerData> = ({
  color,
  filesAmount,
  filesType,
  occupiedMemory,
}) => {
  return (
    <Wrapper borderColor={color}>
      <Text displayStyle={TextDisplayStyle.LargeText} element={"p"}>
        {filesType}
      </Text>
      <Text displayStyle={TextDisplayStyle.SmallFadedText} element={"p"}>
        {filesAmount} files {convertBytes(occupiedMemory)}
      </Text>
    </Wrapper>
  )
}

export default FilesManagerItem
