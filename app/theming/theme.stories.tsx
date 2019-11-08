import { storiesOf } from "@storybook/react"
import * as React from "react"
import styled from "styled-components"
import theme from "./theme"

const Container = styled.div`
  padding: 1rem 2rem;
`

const ColorBox = styled.div<{ color: string }>`
  width: 50px;
  height: 50px;
  border-radius: 3px;
  background: ${({ color }) => color};
  border: 1px solid lightgray;
  padding: 4px;
  background-clip: content-box;

  &::after {
    content: "${({ color }) => color}";
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ color }) => color};
    pointer-events: none;
    opacity: 0;
    transition: opacity 150ms;
    color: #fff;
    text-shadow: 1px 1px 15px rgba(0, 0, 0, 0.5);
    font-size: 3rem;
  }

  &:hover::after {
    opacity: 1;
  }
`

const Section = styled.section`
  margin-bottom: 2rem;
`

const Row = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgray;
`

const Details = styled.div`
  margin-left: 1rem;
`

const ColorName = styled.span`
  color: darkgrey;
`

storiesOf("Theme|Colors", module).add("default", () => {
  return (
    <Container>
      {Object.entries(theme.color).map(([categoryName, colors]) => {
        return (
          <Section key={categoryName}>
            <h3>{categoryName}</h3>
            {Object.entries(colors).map(([colorName, value]) => {
              return (
                <Row key={colorName} color={value}>
                  <ColorBox color={value} />
                  <Details>
                    {colorName}
                    <br />
                    <ColorName>{value}</ColorName>
                  </Details>
                </Row>
              )
            })}
          </Section>
        )
      })}
      <p>
        <i>Hover any colour for a full preview.</i>
      </p>
    </Container>
  )
})
