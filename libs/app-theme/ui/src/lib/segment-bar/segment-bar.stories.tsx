/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react"
import styled from "styled-components"
import { SegmentBar } from "./segment-bar"
import { segmentSetsPreview2_48 } from "./segment-bar.datasets"

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`
const CaseBox = styled.div`
  max-width: 100%;
  margin: 0 auto;
`
const Title = styled.h4`
  margin: 1.2rem 0 0.8rem;
  text-align: center;
  font-weight: 600;
  font-size: 1.4rem;
`

const meta: Meta<typeof SegmentBar> = {
  title: "UI/SegmentBar",
  component: SegmentBar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The `<SegmentBar />` component visualizes proportional segments within a horizontal bar. " +
          "This story demonstrates a variety of design and edge cases, including single and multiple segments, " +
          "minimum width constraints, zero values, and mixed proportional/min-width allocations.",
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof SegmentBar>

export const AllCases: Story = {
  render: () => {
    return (
      <Wrap>
        {segmentSetsPreview2_48.map((set, idx) => (
          <div key={idx}>
            <Title>{set.description}</Title>
            <CaseBox style={{ width: set.containerWidth }}>
              <SegmentBar segments={set.segments} />
            </CaseBox>
          </div>
        ))}
      </Wrap>
    )
  },
}
