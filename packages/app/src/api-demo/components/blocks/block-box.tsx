import React, { FunctionComponent, PropsWithChildren } from "react"
import styled from "styled-components"

interface BoxProperties extends PropsWithChildren {
  data?: {
    title: string
  }
}

export const BlockBox: FunctionComponent<BoxProperties> = ({ data, children }) => {
  return <BoxWrapper>
    {data?.title && <h1>{data.title}</h1>}
    {children}
  </BoxWrapper>
}

const BoxWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`
