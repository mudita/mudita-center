import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import {
  LoaderResolverProp,
  LoaderType,
} from "Renderer/components/core/loader/loader.interface"
import Loader from "Renderer/components/core/loader/loader.component"
import LoaderGif from "Renderer/components/core/loader/loader-gif.component"

const LoaderResolver: FunctionComponent<LoaderResolverProp> = ({
  type,
  loaderProps = {},
}) => {
  const { size = 2, ...rest } = loaderProps
  return (
    <>
      {type === LoaderType.Gif ? (
        <LoaderGif {...rest} />
      ) : (
        <Loader size={size} />
      )}
    </>
  )
}

export default LoaderResolver
