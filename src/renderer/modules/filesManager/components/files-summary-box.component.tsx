import React from "react"
import { FilesManagerData } from "Renderer/models/files-manager/files-manager.interface"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const Wrapper = styled.div`
  width: 23.3rem;
  background-color: ${backgroundColor("light")};
  border: 1px solid black;
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
    <Wrapper>
      {" "}
      {filesType} {convertBytes(occupiedMemory)}
    </Wrapper>
  )
}

export default FilesManagerItem
