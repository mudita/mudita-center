import * as React from "react"
import styled from "styled-components"
import Navigation from "../../../shared/components/navigation/navigation.component"
import FunctionComponent from "../../../types/function-component.interface"
import Files from "../../components/file/files.component"

const FilePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px #ccc dotted;
  padding: 10px;
`

const FilesPage: FunctionComponent = () => {
  return (
    <FilePageWrapper>
      <Navigation />
      <Files />
    </FilePageWrapper>
  )
}

export default FilesPage
