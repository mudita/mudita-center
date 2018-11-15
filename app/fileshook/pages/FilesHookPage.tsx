import * as React from 'react'
import styled from "styled-components"
import Navigation from '../../shared/components/Navigation'

const FilePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px #ccc dotted;
  padding: 10px;
`

function FilesPageHook() {
  return (
    <FilePageWrapper>
      <Navigation/>
    </FilePageWrapper>
  )
}

export default FilesPageHook
