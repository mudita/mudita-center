import * as React from 'react'
import {RouteComponentProps} from 'react-router'
import styled from "styled-components"
import Navigation from '../../../shared/components/Navigation'
import Files from "../../components/file/files.component"

const FilePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px #ccc dotted;
  padding: 10px;
`

export class FilesPage extends React.Component<RouteComponentProps<{}>, {}> {
  render() {
    return (
      <FilePageWrapper>
        <Navigation/>
        <Files/>
      </FilePageWrapper>
    )
  }
}

export default FilesPage
