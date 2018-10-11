import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from "styled-components";
import Files from "../components/Files";

const FilePageWrapper = styled.div`

`;

export class FilesPage extends React.Component<RouteComponentProps<{}>, {}> {
  render() {
    return (
      <FilePageWrapper>
        <Files/>
      </FilePageWrapper>
    );
  }
}

export default FilesPage;
