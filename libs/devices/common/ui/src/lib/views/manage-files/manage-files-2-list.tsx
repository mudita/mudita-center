/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback } from "react"
import styled from "styled-components"
import { Form, FormValues } from "./manage-files-2-form"
import { useFormContext } from "react-hook-form"
import { Checkbox, TableNew, Tooltip } from "app-theme/ui"
import { Contact } from "devices/common/models"
import {
  ColumnCheckbox,
  ColumnMorePhones,
  ColumnName,
  ColumnPhone,
} from "../contacts/columns"
import { CheckboxSize } from "app-theme/models"

interface File {
  id: string
  name: string
  size: number
  type: string
}

interface Props {
  files: File[]
  onAdd: (file: File) => void
  onDelete?: (fileId: string) => void
  onSelect?: (fileId: string) => void
  onExport?: (fileId: string) => void
}

export const ManageFiles2List: FunctionComponent<Props> = (props) => {
  return (
    <Form>
      <ManageFiles2ListInner {...props} />
    </Form>
  )
}

const ManageFiles2ListInner: FunctionComponent<Props> = ({
  files,
  onAdd,
  onDelete,
  onSelect,
  onExport,
}) => {
  const { watch, register } = useFormContext<FormValues>()

  const activeFileId = watch("activeFileId")

  const rowRenderer = useCallback(
    (file: File) => {
      const onClick = onSelect
        ? () => {
            onSelect(file.id)
          }
        : undefined
      return (
        <TableNew.Row
          key={file.id}
          onClick={onClick}
          rowSelectorCheckboxDataAttr={"data-row-checkbox"}
          active={activeFileId === file.id}
        >
          <div style={{ width: 80 }}>
            <Tooltip placement={"bottom-right"} offset={{ x: 24, y: 5 }}>
              <Tooltip.Anchor>
                <CustomCheckbox
                  data-row-checkbox
                  key={file.id}
                  size={CheckboxSize.Small}
                  {...register(`selectedFiles.${file.id}`)}
                />
              </Tooltip.Anchor>
              <Tooltip.Content>Select</Tooltip.Content>
            </Tooltip>
          </div>
          <div style={{ flex: 1 }}>{file.name}</div>
          <div style={{ width: 120 }}>{file.type}</div>
          <div style={{ width: 120 }}>{file.size} bytes</div>
        </TableNew.Row>
      )
    },
    [activeFileId, onSelect, register]
  )

  return (
    <Wrapper>
      <TableNew itemIdField={"id"} items={files} rowRenderer={rowRenderer} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const CustomCheckbox = styled(Checkbox)`
  width: 3.6rem;
  height: 3.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
`
