import { useEffect } from "react"
import * as React from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import RootState from "../../../reducers/state"
import FunctionComponent from "../../../types/function-component.interface"
import { setCurrentPath, setFiles } from "../../actions/files.actions"
import { State as FileState } from "../../reducers/files.reducer"
import { currentPath, selectFiles } from "../../selectors/file.selector"
import FileListElementComponent from "../file-list-element/file-list-element.component"

const { remote } = require("electron")
const mainRef = remote.require("./main.js")

const fileUtils = mainRef.electronUtils.fileUtils

interface FileProps {
  link?: string
}

interface DispatchProps {
  setCurrentPath: (path: string) => void
  setFiles: (files: string[]) => void
}

const FilesWrapper = styled.div`
  background-color: #222;
  padding: 1rem;
  color: white;
`

export const FilesIntro = styled.p`
  font-size: large;
  code {
    font-size: 1.3rem;
  }
`

export const FilesTitle = styled.h1`
  font-weight: 900;
`

const FileListWrapper = styled.ul`
  background: #00c2;
  padding: 20px;
  margin: 0;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-left: 0.4rem solid red;
`

const Files: FunctionComponent<FileProps & FileState & DispatchProps> = ({
  currentFolder,
  filePaths,
  setCurrentPath: setCurrentPathAction,
  setFiles: setFilesAction,
}) => {
  useEffect(() => {
    fileUtils.listFiles().then(setFilesAction)
  }, [])
  const onElementClick = (element: string) => {
    setCurrentPathAction(element)
  }
  return (
    <FilesWrapper>
      <FilesTitle>{currentFolder}</FilesTitle>
      <FilesIntro>File list below</FilesIntro>
      <FileListWrapper>
        {filePaths.map((el, key) => (
          <FileListElementComponent
            onClick={onElementClick}
            key={key}
            el={el.name}
          />
        ))}
      </FileListWrapper>
    </FilesWrapper>
  )
}

const mapStateToProps = (state: RootState): FileState => ({
  currentFolder: currentPath(state),
  filePaths: selectFiles(state),
})

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  setCurrentPath: (path: string) => dispatch(setCurrentPath(path)),
  setFiles: (path: string[]) => dispatch(setFiles(path)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Files)
