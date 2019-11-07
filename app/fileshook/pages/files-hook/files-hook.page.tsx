import * as React from 'react'
import styled from "styled-components"
import Navigation from '../../../shared/components/navigation/navigation.component'
import FilesHook from '../../components/files-hook/files-hook.component'

const FilePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px #ccc dotted;
  padding: 10px;
`

const FilesPageHook = () => {
  return (
    <FilePageWrapper>
      <Navigation/>
      <FilesHook/>
    </FilePageWrapper>
  )
}

export default FilesPageHook
