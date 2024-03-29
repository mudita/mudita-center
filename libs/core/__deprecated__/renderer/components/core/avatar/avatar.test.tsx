/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import Avatar, {
  AvatarProps,
  AvatarSize,
  getAvatarSize,
} from "Core/__deprecated__/renderer/components/core/avatar/avatar.component"
import { AvatarTestIds } from "Core/__deprecated__/renderer/components/core/avatar/avatar-test-ids.enum"

const avatarUser = {
  firstName: "John",
  lastName: "Doe",
  id: "0",
}

const renderAvatar = ({ ...props }: Partial<AvatarProps> = {}) => {
  return renderWithThemeAndIntl(<Avatar {...props} />)
}

const testSize = (size: AvatarSize) => {
  const { container } = renderAvatar({ size })
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  expect(container.firstChild).toHaveStyleRule(
    "width",
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    getAvatarSize(size) + "rem"
  )
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  expect(container.firstChild).toHaveStyleRule(
    "height",
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    getAvatarSize(size) + "rem"
  )
}

test("avatar renders in small size properly", () => {
  testSize(AvatarSize.Small)
})

test("avatar renders in medium size properly", () => {
  testSize(AvatarSize.Medium)
})

test("avatar renders in big size properly", () => {
  testSize(AvatarSize.Big)
})

test("avatar renders text content properly", () => {
  const { container } = renderAvatar({ user: avatarUser })
  expect(container).toHaveTextContent("JD")
})

test("avatar renders image properly", () => {
  const { getByTestId } = renderAvatar({ imageSrc: "someImageSrc" })
  expect(getByTestId(AvatarTestIds.AvatarImage)).toBeInTheDocument()
})

test("avatar renders default image properly", () => {
  const { getByTestId } = renderAvatar()
  expect(getByTestId("icon-ContactFilled")).toBeInTheDocument()
})

test("avatar renders image first", () => {
  const { getByTestId, queryByText } = renderAvatar({
    user: avatarUser,
    imageSrc: "someImageSrc",
  })
  expect(getByTestId(AvatarTestIds.AvatarImage)).toBeInTheDocument()
  expect(queryByText("JD")).not.toBeInTheDocument()
})
