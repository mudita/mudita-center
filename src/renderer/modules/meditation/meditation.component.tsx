import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import DataBoxes from "Renderer/components/rest/meditation/data-boxes.component"
import styled from "styled-components"

const MeditationWrapper = styled.div`
  padding: 0 3rem 0 4rem;
`

const Meditation: FunctionComponent = () => (
  <MeditationWrapper>
    <DataBoxes />
  </MeditationWrapper>
)

export default Meditation
