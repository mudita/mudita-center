import { storiesOf } from "@storybook/react"
import * as React from "react"
import LoaderSpinner from "Renderer/components/core/loader/loader-spinner.component"
import styled from "styled-components"
import LoaderLogo from "Renderer/components/core/loader/loader-logo.component"
import Loader from "Renderer/components/core/loader/loader.component"
import { LoaderType } from "Renderer/components/core/loader/loader.interface"
import { select, withKnobs } from "@storybook/addon-knobs"

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50rem;
  width: 100%;
`

const HotLoader = styled(LoaderSpinner)`
  color: hotpink;
`

storiesOf("Components|Loader ", module)
  .add("Default", () => {
    return (
      <Container>
        <LoaderSpinner />
      </Container>
    )
  })
  .add("Custom", () => {
    return (
      <Container>
        <HotLoader />
      </Container>
    )
  })
  .add("Loader gif", () => {
    return (
      <Container>
        <LoaderLogo height={200} width={200} />
      </Container>
    )
  })
  .add("Loader resolver", () => {
    const label = "Loaders type"
    const options = {
      Gif: LoaderType.Gif,
      Css: LoaderType.Css,
    }
    const defaultValue = LoaderType.Css

    const value = select(label, options, defaultValue)
    return (
      <Container>
        <Loader type={value} />
      </Container>
    )
  })
  .addDecorator(withKnobs)
