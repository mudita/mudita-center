import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Avatar, {
  AvatarProps,
  AvatarSize,
  getAvatarSize,
} from "Renderer/components/core/avatar/avatar.component"

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
  expect(container.firstChild).toHaveStyleRule(
    "width",
    getAvatarSize(size) + "rem"
  )
  expect(container.firstChild).toHaveStyleRule(
    "height",
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
  expect(getByTestId("avatar-image")).toBeInTheDocument()
})

test("avatar renders default image properly", () => {
  const { getByTestId } = renderAvatar()
  expect(getByTestId("icon-Contact")).toBeInTheDocument()
})

test("avatar renders image first", () => {
  const { getByTestId, queryByText } = renderAvatar({
    user: avatarUser,
    imageSrc: "someImageSrc",
  })
  expect(getByTestId("avatar-image")).toBeInTheDocument()
  expect(queryByText("JD")).not.toBeInTheDocument()
})
