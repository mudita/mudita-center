import * as React from "react"
import FilesSummaryItem from "App/files-manager/components/files-summary-item/files-summary-item.component"
import { DiskSpaceCategoryType } from "App/files-manager/constants"
import { DiskSpaceCategory } from "App/files-manager/components/files-manager/files-manager.interface"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

const fakeData: DiskSpaceCategory = {
  type: DiskSpaceCategoryType.System,
  color: "#DFEFDE",
  icon: IconType.MuditaLogo,
  label: "System",
  size: 62914560,
}

export default {
  title: "Views|Files Manager/FilesSummaryItem",
}

export const _FilesSummaryItem = () => {
  return <FilesSummaryItem {...fakeData} />
}

_FilesSummaryItem.story = {
  name: "FilesSummaryItem",
}

export const FilesSummaryItemWithFilesAmount = () => {
  return <FilesSummaryItem {...fakeData} filesAmount={6} />
}

FilesSummaryItemWithFilesAmount.story = {
  name: "FilesSummaryItem with filesAmount",
}
