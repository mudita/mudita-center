import * as React from "react"
import {useEffect, useState} from "react"
import styled from 'styled-components'

const {remote} = require('electron')
const mainRef = remote.require("./main.js")

const fileUtils = mainRef.electronUtils.fileUtils
const basePath = require('electron').remote.app.getPath('documents');

const FilesHookWrapper = styled.div`
  flex: 1
`

const UlStyle = styled.ul`
  padding: 0;
`

const LiStyle = styled.li`
  padding-left: 16px;
  content: "*";
  padding-right: 8px;
`

function FilesHook() {
  const [currentPath, setCurrentPath] = useState(`${basePath}`)
  const [paths, setPaths] = useState([] as any[])

  useEffect(() => {
    console.log(currentPath)
    fileUtils.listFiles(currentPath).then((result: any[]) => {
      const structuredPaths = result.map(el => {
        return {
          type: fileUtils.checkType(el), path: el
        }
      })
      console.log(structuredPaths)
      setPaths(structuredPaths)
      // setCurrentPath('.')
    })
  }, [currentPath])

  const linkedPaths = paths.map((el, index) => {
    return <LiStyle
      onClick={() => {
        setCurrentPath(`${currentPath}.\\${el.path}`)
      }} key={index}>
      {el.path}
    </LiStyle>
  })

  return (
    <FilesHookWrapper>
      <UlStyle>
        {linkedPaths}
      </UlStyle>
    </FilesHookWrapper>
  )
}


export default FilesHook