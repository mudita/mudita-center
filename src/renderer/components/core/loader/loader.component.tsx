import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import {
  LoaderProps,
  LoaderType,
} from "Renderer/components/core/loader/loader.interface"
import LoaderSpinner from "Renderer/components/core/loader/loader-spinner.component"
import LoaderLogo from "Renderer/components/core/loader/loader-logo.component"

const Loader: FunctionComponent<LoaderProps> = ({
  type,
  size,
  ...imageProps
}) => {
  return (
    <>
      {type === LoaderType.Logo ? (
        <LoaderLogo size={size} {...imageProps} />
      ) : (
        <LoaderSpinner size={size} />
      )}
    </>
  )
}

export default Loader
