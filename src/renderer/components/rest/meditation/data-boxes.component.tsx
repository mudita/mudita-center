import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import DataBox from "Renderer/components/rest/meditation/data-box.component"
import { TextWrapper } from "Renderer/components/rest/meditation/data-box.styled"
import LargeDataText from "Renderer/components/rest/meditation/large-data-text.component"
import SmallDataText from "Renderer/components/rest/meditation/small-data-text.component"
import CaptionDataText from "Renderer/components/rest/meditation/caption-data-text.component"
import styled from "styled-components"

const DataBoxesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 4rem;
  max-width: 90.5rem;
`

const DataBoxes: FunctionComponent<{}> = () => (
  <DataBoxesWrapper>
    <DataBox>
      <TextWrapper>
        <LargeDataText>6</LargeDataText>
        <SmallDataText>/7</SmallDataText>
      </TextWrapper>
      <CaptionDataText id="view.name.meditation.dataBox.daysPracticed" />
    </DataBox>
    <DataBox>
      <TextWrapper>
        <LargeDataText>1</LargeDataText>
        <SmallDataText>h</SmallDataText>
        <LargeDataText>11</LargeDataText>
        <SmallDataText>m</SmallDataText>
        <LargeDataText>14</LargeDataText>
        <SmallDataText>s</SmallDataText>
      </TextWrapper>
      <CaptionDataText id="view.name.meditation.dataBox.totalPracticeTime" />
    </DataBox>
    <DataBox>
      <TextWrapper>
        <LargeDataText>17</LargeDataText>
        <SmallDataText>m</SmallDataText>
        <LargeDataText>32</LargeDataText>
        <SmallDataText>s</SmallDataText>
      </TextWrapper>
      <CaptionDataText id="view.name.meditation.dataBox.averageSessionLength" />
    </DataBox>
  </DataBoxesWrapper>
)

export default DataBoxes
