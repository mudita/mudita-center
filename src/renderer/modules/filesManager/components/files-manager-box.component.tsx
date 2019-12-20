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

const FilesManagerItem: FunctionComponent<FilesManagerData> = ({
  color,
  filesAmount,
  filesType,
  occupiedMemory,
}) => {
  return <Wrapper>{filesType}</Wrapper>
}

export default FilesManagerItem
