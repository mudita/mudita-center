import * as React from "react";
import styled from "styled-components";

interface FileListElementProps {
  el?: string
  onClick: (element: string | undefined) => void
}

const FileListElementWrapper = styled.li`
      border-bottom: 1px solid #ddd;
`;

class FileListElement extends React.Component<FileListElementProps, {}> {



  render() {
    const {el, onClick} = this.props;
    return (
      <FileListElementWrapper onClick={() => onClick(el)}>
        {el}
      </FileListElementWrapper>
    );
  }
}

export default FileListElement;