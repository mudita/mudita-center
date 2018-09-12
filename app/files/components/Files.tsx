import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import RootState from "../../reducers/state";
import { State as FileState } from "../reducers/files";

interface FileProps {
  link?: string
}

const FilesWrapper = styled.div`
  background-color: #222;
  height: 12rem;
  padding: 1rem;
  color: white;
  text-align: center;
`;

const FilesIntro = styled.p`
  font-size: large;
  code {
    font-size: 1.3rem;
  }
`;

const FilesTitle = styled.h1`
  font-weight: 900;
`;


const FilesTitle2 = styled.h1`
  font-weight: 900;
`;

class Files extends React.Component<FileProps & FileState, {}> {

  render() {

    return (
      <FilesWrapper>
        <FilesTitle> title </FilesTitle>
        <FilesIntro>
          Here be text
          <Link to='/'> home </Link>
          <FilesTitle2> asds</FilesTitle2>
        </FilesIntro>
      </FilesWrapper>
    );
  }
}

const mapStateToProps = (state: RootState): FileState => ({
  currentFolder: state.files.currentFolder,
  names: state.files.names
});


export default connect(mapStateToProps, null)(Files);