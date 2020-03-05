import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import {
  LoaderResolverProp,
  LoaderType,
} from "Renderer/components/core/loader/loader.interface"
import LoaderSpinner from "Renderer/components/core/loader/loader-spinner.component"
import LoaderLogo from "Renderer/components/core/loader/loader-logo.component"

const Loader: FunctionComponent<LoaderResolverProp> = ({
  type,
  loaderProps = {},
}) => {
  const { size, ...rest } = loaderProps
  return (
    <>
      {type === LoaderType.Gif ? (
        <LoaderLogo {...rest} />
      ) : (
        <LoaderSpinner size={size} />
      )}
    </>
  )
}

export default Loader
