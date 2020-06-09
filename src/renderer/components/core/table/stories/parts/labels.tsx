import React from "react"
import { Files, Part } from "Renderer/components/core/table/stories/styles"
import {
  Col,
  Group,
  Labels,
} from "Renderer/components/core/table/table.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

export default () => (
  <>
    <Part>
      <Text displayStyle={TextDisplayStyle.SmallText}>Column labels</Text>
      <Files>
        <Labels>
          <Col>File type</Col>
          <Col>Last backup</Col>
          <Col>Size</Col>
        </Labels>
      </Files>
    </Part>
    <Part>
      <Text displayStyle={TextDisplayStyle.SmallText}>Group label</Text>
      <Files>
        <Group>
          <Labels>
            <Col>Favourites</Col>
          </Labels>
        </Group>
      </Files>
    </Part>
  </>
)
