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
  if (children.props.children) {
    if (Array.isArray(children.props.children)) {
      return children.props.children[0]._source
    } else {
      return children.props.children._source
    }
  }
  return { lineNumber: 0, fileName: "" }
}
