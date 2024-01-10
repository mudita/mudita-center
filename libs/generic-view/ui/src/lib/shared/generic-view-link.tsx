/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Link, LinkProps } from "react-router-dom"

type GenericLinkProps = LinkProps<{ previousViewName?: string }>

interface Props extends GenericLinkProps {
  to: Exclude<GenericLinkProps["to"], string>
}

export const GenericViewLink = Link as FunctionComponent<Props>
