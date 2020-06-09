import React from "react"
import {
  Checkbox,
  Part,
  SelectableFiles,
} from "Renderer/components/core/table/stories/styles"
import { Col, Row } from "Renderer/components/core/table/table.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import theme from "Renderer/styles/theming/theme"
import { noop } from "Renderer/utils/noop"

export default () => (
  <>
    <Part>
      <Text displayStyle={TextDisplayStyle.SmallText}>Default</Text>
      <SelectableFiles>
        <Row>
          <Col>
            <Checkbox checked={false} onChange={noop} />
            <div>Music</div>
          </Col>
          <Col>{new Date().toLocaleString()}</Col>
          <Col>50 MB</Col>
        </Row>
      </SelectableFiles>
    </Part>
    <Part>
      <Text displayStyle={TextDisplayStyle.SmallText}>Hovered</Text>
      <SelectableFiles>
        <Row style={{ backgroundColor: theme.color.background.accent }}>
          <Col>
            <Checkbox checked={false} onChange={noop} />
            <div>Music</div>
          </Col>
          <Col>{new Date().toLocaleString()}</Col>
          <Col>50 MB</Col>
        </Row>
      </SelectableFiles>
    </Part>
    <Part>
      <Text displayStyle={TextDisplayStyle.SmallText}>Active (clickable)</Text>
      <SelectableFiles>
        <Row active onClick={noop}>
          <Col>
            <Checkbox checked={false} onChange={noop} />
            <div>Music</div>
          </Col>
          <Col>{new Date().toLocaleString()}</Col>
          <Col>50 MB</Col>
        </Row>
      </SelectableFiles>
    </Part>
    <Part>
      <Text displayStyle={TextDisplayStyle.SmallText}>Selected</Text>
      <SelectableFiles>
        <Row selected>
          <Col>
            <Checkbox checked={true} onChange={noop} />
            <div>Music</div>
          </Col>
          <Col>{new Date().toLocaleString()}</Col>
          <Col>50 MB</Col>
        </Row>
      </SelectableFiles>
    </Part>
  </>
)
