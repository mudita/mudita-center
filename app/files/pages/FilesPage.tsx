import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Files from "../components/Files";

export class FilesPage extends React.Component<RouteComponentProps<{}>, {}> {
  render() {
    return (
        <Files/>
    );
  }
}

export default FilesPage;
