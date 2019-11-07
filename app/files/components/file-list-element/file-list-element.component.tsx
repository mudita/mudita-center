import * as React from "react"
import styled from "styled-components"
import FunctionComponent from "../../../types/function-component.interface"

interface FileListElementProps {
  el?: string
  onClick: (element: string | undefined) => void
}

const FileListElementWrapper = styled.li`
  border-bottom: 1px solid #ddd;
`

const FileListElement: FunctionComponent<FileListElementProps> = ({
  el,
  onClick,
}) => {
  const handleWrapperClick = () => onClick(el)
  return (
    <FileListElementWrapper onClick={handleWrapperClick}>
      {el}
    </FileListElementWrapper>
  )
}

export default FileListElement
