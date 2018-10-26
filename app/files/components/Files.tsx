import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import RootState from "../../reducers/state";
import { setCurrentPath, setFiles } from "../actions/files.actions";
import { State as FileState } from "../reducers/files.reducer";
import { currentPath, selectFiles } from "../selectors/file.selector";
import FileListElement from "./FileListElement";

// const {remote} = require('electron')
// const mainRef = remote.require("./main.js")

// const fileUtils = mainRef.electronUtils.fileUtils

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
`;

export const FilesIntro = styled.p`
  font-size: large;
  code {
    font-size: 1.3rem;
  }
`;

export const FilesTitle = styled.h1`
  font-weight: 900;
`;

const FileListWrapper = styled.ul`
    background: #00c2;
    padding: 20px;
    margin: 0;
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-left: 0.4rem solid red;
`;

class Files extends React.Component<FileProps & FileState & DispatchProps, {}> {

  async componentDidMount() {
    // this.props.setFiles(await fileUtils.listFiles())
  }

  render() {
    const {currentFolder, filePaths} = this.props;
    return (
      <FilesWrapper>
        {/*<Link to='/'> home </Link>*/}
        <FilesTitle>{currentFolder}</FilesTitle>
        <FilesIntro>File list below</FilesIntro>
        <FileListWrapper>
          {filePaths.map((el, key) => <FileListElement onClick={this.onElementClick} key={key} el={el.name}/>)}
        </FileListWrapper>
      </FilesWrapper>
    );
  }

  onElementClick = (element: string) => {
    this.props.setCurrentPath(element);
  };

}

const mapStateToProps = (state: RootState): FileState => ({
  currentFolder: currentPath(state),
  filePaths: selectFiles(state)
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  setCurrentPath: (path: string) => dispatch(setCurrentPath(path)),
  setFiles: (path: string[]) => dispatch(setFiles(path))
});


export default connect(mapStateToProps, mapDispatchToProps)(Files);