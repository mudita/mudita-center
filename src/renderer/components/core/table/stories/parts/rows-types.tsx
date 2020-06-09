import React from "react"
import { Files, Part } from "Renderer/components/core/table/stories/styles"
import {
  Col,
  NestedGroup,
  Row,
  RowSize,
} from "Renderer/components/core/table/table.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

export default () => (
  <>
    <Part>
      <Text displayStyle={TextDisplayStyle.SmallText}>Big row</Text>
      <Files>
        <Row size={RowSize.Big}>
          <Col>Music</Col>
          <Col>{new Date().toLocaleString()}</Col>
          <Col>50 MB</Col>
        </Row>
      </Files>
    </Part>
    <Part>
      <Text displayStyle={TextDisplayStyle.SmallText}>
        Medium (default) row
      </Text>
      <Files>
        <Row>
          <Col>Music</Col>
          <Col>{new Date().toLocaleString()}</Col>
          <Col>50 MB</Col>
        </Row>
      </Files>
    </Part>
    <Part>
      <Text displayStyle={TextDisplayStyle.SmallText}>Small row</Text>
      <Files>
        <Row size={RowSize.Small}>
          <Col>Music</Col>
          <Col>{new Date().toLocaleString()}</Col>
          <Col>50 MB</Col>
        </Row>
      </Files>
    </Part>
    <Part>
      <Text displayStyle={TextDisplayStyle.SmallText}>Tiny row</Text>
      <Files>
        <Row size={RowSize.Tiny}>
          <Col>Music</Col>
          <Col>{new Date().toLocaleString()}</Col>
          <Col>50 MB</Col>
        </Row>
      </Files>
    </Part>
    <Part>
      <Text displayStyle={TextDisplayStyle.SmallText}>
        Nested rows (default and small)
      </Text>
      <Files>
        <Row>
          <Col>Music</Col>
          <Col>{new Date().toLocaleString()}</Col>
          <Col>50 MB</Col>
        </Row>
        <NestedGroup>
          <Row size={RowSize.Small}>
            <Col>Ringtones</Col>
            <Col>{new Date().toLocaleString()}</Col>
            <Col>10 MB</Col>
          </Row>
          <Row size={RowSize.Small}>
            <Col>Songs</Col>
            <Col>{new Date().toLocaleString()}</Col>
            <Col>40 MB</Col>
          </Row>
        </NestedGroup>
      </Files>
    </Part>
  </>
)
