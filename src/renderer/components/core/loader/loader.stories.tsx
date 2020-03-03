import { storiesOf } from "@storybook/react"
import * as React from "react"
import Loader from "Renderer/components/core/loader/loader.component"
import styled from "styled-components"
import LoaderGif from "Renderer/components/core/loader/loader-gif.component"
import LoaderResolver from "Renderer/components/core/loader/loader-resolver.component"
import { LoaderType } from "Renderer/components/core/loader/loader.interface"

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50rem;
  width: 100%;
`

const HotLoader = styled(Loader)`
  color: hotpink;
`

storiesOf("Components|Loader ", module)
  .add("Default", () => {
    return (
      <Container>
        <Loader />
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
        <LoaderGif height={200} width={200} />
      </Container>
    )
  })
  .add("Loader resolver", () => {
    return (
      <Container>
        <LoaderResolver
          type={LoaderType.Gif}
          loaderProps={{
            height: 100,
            size: 111,
          }}
        />
      </Container>
    )
  })
