/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

interface Params {
  dataUrl: string
  maxWidth: number
  maxHeight: number
}

export const resizeImage = ({ dataUrl, maxWidth, maxHeight }: Params) => {
  const image = window.api.nativeImage.createFromDataURL(dataUrl)
  const { width, height } = image.getSize(1)

  if (width <= maxWidth && height <= maxHeight) {
    return dataUrl
  }

  const aspectRatio = width / height
  let newWidth = width
  let newHeight = height

  if (width > maxWidth) {
    newWidth = maxWidth
    newHeight = Math.round(maxWidth / aspectRatio)
  }
  if (newHeight > maxHeight) {
    newHeight = maxHeight
    newWidth = Math.round(maxHeight * aspectRatio)
  }

  const resizedImage = image.resize({
    width: newWidth,
    height: newHeight,
  })
  return resizedImage.toDataURL()
}
