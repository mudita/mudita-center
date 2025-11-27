/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback } from "react"
import styled from "styled-components"
import {
  FileManagerFile,
  ManageFilesTableSectionProps,
} from "devices/common/ui"
import {
  ButtonSize,
  ButtonType,
  IconType,
  TypographyTransform,
} from "app-theme/models"
import {
  CellProps,
  ColumnCheckboxCell,
  FileListEmptyTable,
  HeaderCellCheckbox,
  HeaderCellName as BaseHeaderCellName,
  HeaderCellNameText as BaseHeaderCellNameText,
  HeaderCellSize as BaseHeaderCellSize,
  HeaderCellSizeText as BaseHeaderCellSizeText,
  HeaderCellType as BaseHeaderCellType,
  HeaderCellTypeText as BaseHeaderCellTypeText,
  NameCell as BaseNameCell,
  SizeCell as BaseSizeCell,
  TypeCell as BaseTypeCell,
} from "./files-table-section-shared"
import {
  Badge,
  Button,
  TableCell,
  TableHeaderCell,
  Typography,
} from "app-theme/ui"
import {
  FileManagerFileMap,
  isAppFileManagerFile,
} from "../device-manage-files.types"

interface DeviceManageAppFilesTableSectionProps
  extends ManageFilesTableSectionProps<FileManagerFileMap> {
  onAppInstallButtonClick?: StatusCellProps["onAppInstallButtonClick"]
}

export const DeviceManageAppFilesTableSection: FunctionComponent<
  DeviceManageAppFilesTableSectionProps
> = ({
  fileMap,
  selectedIds,
  activeRowId,
  onSelectedChange,
  onAppInstallButtonClick,
}) => {
  return (
    <FileListEmptyTable
      activeRowId={activeRowId}
      dataIds={fileMap ? Object.keys(fileMap) : []}
    >
      <HeaderCellCheckbox></HeaderCellCheckbox>
      <HeaderCellName>
        <BaseHeaderCellNameText textTransform={TypographyTransform.Uppercase}>
          Name
        </BaseHeaderCellNameText>
      </HeaderCellName>
      <HeaderCellType>
        <BaseHeaderCellTypeText textTransform={TypographyTransform.Uppercase}>
          Type
        </BaseHeaderCellTypeText>
      </HeaderCellType>
      <HeaderCellSize>
        <BaseHeaderCellSizeText textTransform={TypographyTransform.Uppercase}>
          Size
        </BaseHeaderCellSizeText>
      </HeaderCellSize>
      <HeaderCellStatus>
        <HeaderCellStatusText textTransform={TypographyTransform.Uppercase}>
          Status
        </HeaderCellStatusText>
      </HeaderCellStatus>
      <ColumnCheckboxCell
        selectedIds={selectedIds}
        fileMap={fileMap}
        onChange={onSelectedChange}
      />
      <NameCell fileMap={fileMap} />
      <TypeCell fileMap={fileMap} />
      <SizeCell fileMap={fileMap} />
      <StatusCell
        fileMap={fileMap}
        onAppInstallButtonClick={onAppInstallButtonClick}
      />
    </FileListEmptyTable>
  )
}

const HeaderCellName = styled(BaseHeaderCellName)`
  width: 28.9rem;
`

const HeaderCellType = styled(BaseHeaderCellType)`
  width: 10.4rem;
`

const HeaderCellSize = styled(BaseHeaderCellSize)`
  width: 8.8rem;
`

const HeaderCellStatus = styled(TableHeaderCell)`
  width: 10rem;
  padding: 1.4rem 0 1.2rem 0;
`

export const HeaderCellStatusText = styled(Typography.P5)``

const NameCell = styled(BaseNameCell)`
  width: 28.9rem;
`

const TypeCell = styled(BaseTypeCell)`
  width: 10.4rem;
`

const SizeCell = styled(BaseSizeCell)`
  width: 8.8rem;
`

interface StatusCellProps extends CellProps {
  onAppInstallButtonClick?: (file: FileManagerFile) => void
}

const StatusCell: FunctionComponent<StatusCellProps> = ({
  dataItemId,
  fileMap,
  onAppInstallButtonClick,
}) => {
  const file = dataItemId ? fileMap[dataItemId] : undefined
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
        <ColumnStatusText
          textTransform={TypographyTransform.CapitalizeFirstLetter}
        >
          {status}
        </ColumnStatusText>
      </ColumnStatusBadge>
    </ColumnStatusBadgeWrapper>
  )
}

const ColumnStatus = styled(TableCell)`
  width: 10rem;
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

export const ColumnStatusText = styled(Typography.P5)``
