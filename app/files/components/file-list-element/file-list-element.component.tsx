import * as React from "react";
import styled from "styled-components";
import FunctionComponent from '../../../types/function-component.interface'

interface FileListElementProps {
  el?: string
  onClick: (element: string | undefined) => void
}

const FileListElementWrapper = styled.li`
      border-bottom: 1px solid #ddd;
`;

const FileListElement: FunctionComponent<FileListElementProps> = ({el, onClick}) => {
    return (
      <FileListElementWrapper onClick={() => onClick(el)}>
        {el}
      </FileListElementWrapper>
    );
}

export default FileListElement;
