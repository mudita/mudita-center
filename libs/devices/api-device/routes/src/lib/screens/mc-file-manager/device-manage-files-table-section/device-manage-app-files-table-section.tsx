/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback } from "react"
import styled from "styled-components"
import { FileManagerFile } from "devices/common/ui"
import {
  ButtonSize,
  ButtonType,
  IconType,
  TypographyTransform,
} from "app-theme/models"
import {
  ColumnCheckboxCell,
  HeaderCellCheckbox,
  HeaderCellName,
  HeaderCellSize,
  HeaderCellType,
  NameCell,
  SizeCell,
  TypeCell,
} from "./files-table-section-shared"
import { Badge, Button, TableNew, Typography } from "app-theme/ui"
import { isAppFileManagerFile } from "../device-manage-files.types"

interface DeviceManageAppFilesTableSectionProps {
  files: FileManagerFile[]
  onAppInstallButtonClick?: StatusCellProps["onAppInstallButtonClick"]
}

export const DeviceManageAppFilesTableSection: FunctionComponent<
  DeviceManageAppFilesTableSectionProps
> = ({ files, onAppInstallButtonClick }) => {
  const rowRenderer = useCallback(
    (file: FileManagerFile) => {
      return (
        <TableNew.Row
          key={file.id}
          rowSelectorCheckboxDataAttr={"data-row-checkbox"}
        >
          <ColumnCheckboxCell
            id={file.id}
            checkboxDataAttr={"data-row-checkbox"}
          />
          <NameCell file={file} />
          <TypeCell file={file} />
          <SizeCell file={file} />
          <StatusCell
            file={file}
            onAppInstallButtonClick={onAppInstallButtonClick}
          />
        </TableNew.Row>
      )
    },
    [onAppInstallButtonClick]
  )

  return (
    <TableNew
      itemIdField={"id"}
      items={files}
      rowRenderer={rowRenderer}
      header={
        <>
          <HeaderCellCheckbox />
          <HeaderCellName>Name</HeaderCellName>
          <HeaderCellType>Type</HeaderCellType>
          <HeaderCellSize>Size</HeaderCellSize>
          <HeaderCellStatus>Status</HeaderCellStatus>
        </>
      }
    />
  )
}

// Status column
const HeaderCellStatus = styled(TableNew.HeaderCell)`
  width: 10rem;
  padding: 1.4rem 0 1.2rem 0;
`

interface StatusCellProps {
  file: FileManagerFile
  onAppInstallButtonClick?: (file: FileManagerFile) => void
}

const StatusCell: FunctionComponent<StatusCellProps> = ({
  file,
  onAppInstallButtonClick,
}) => {
  const additionalInfo = isAppFileManagerFile(file)
    ? file.additionalInfo
    : {
        installationStatus: "INSTALLED",
        apkVersion: "",
        installedVersion: undefined,
      }

  const { installationStatus, apkVersion, installedVersion } = additionalInfo

  const handleAppInstallButtonClick = useCallback(() => {
    file && onAppInstallButtonClick?.(file)
  }, [file, onAppInstallButtonClick])

  if (installationStatus === "INSTALLED" && installedVersion === apkVersion) {
    return (
      <ColumnStatus>
        <StatusBadge status="Installed"></StatusBadge>
      </ColumnStatus>
    )
  }

  return (
    <ColumnStatus>
      <ColumnStatusButton
        type={ButtonType.Primary}
        size={ButtonSize.AutoMin}
        onClick={handleAppInstallButtonClick}
      >
        Install
      </ColumnStatusButton>
    </ColumnStatus>
  )
}

const ColumnStatusButton = styled(Button)`
  height: 2.4rem;
  width: 6.8rem;
  text-transform: capitalize;
`

const StatusBadge: FunctionComponent<{
  status: string
}> = ({ status }) => {
  return (
    <ColumnStatusBadgeWrapper>
      <ColumnStatusBadge icon={IconType.CheckBold} backgroundColor={"green"}>
        <Typography.P5
          textTransform={TypographyTransform.CapitalizeFirstLetter}
        >
          {status}
        </Typography.P5>
      </ColumnStatusBadge>
    </ColumnStatusBadgeWrapper>
  )
}

const ColumnStatus = styled.div`
  width: 10rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ColumnStatusBadge = styled(Badge)`
  padding: 0 0.4rem 0 0.2rem;
`

const ColumnStatusBadgeWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  color: ${({ theme }) => theme.app.color.grey1};
`
