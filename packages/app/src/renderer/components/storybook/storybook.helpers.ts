/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

export interface StoryWrapperChildren {
  _source: {
    fileName: string
    lineNumber: number
  }
}

export interface StoryChildren extends Partial<StoryWrapperChildren> {
  props: {
    children: StoryWrapperChildren[] | StoryWrapperChildren
  }
}

export const getSource = (
  children: StoryChildren
): StoryWrapperChildren["_source"] => {
  if (children._source) {
    return children._source
  }

  const defaultSource = { lineNumber: 0, fileName: "" }
  const grandchildren = children.props.children

  if (grandchildren) {
    if (Array.isArray(grandchildren)) {
      if (grandchildren[0]._source) {
        return grandchildren[0]._source
      }
      return defaultSource
    }
    if (grandchildren._source) {
      return grandchildren._source
    } else {
      return defaultSource
    }
  }
  return defaultSource
}
