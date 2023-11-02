import * as React from "react"
import FilesSummary from "App/files-manager/components/files-summary/files-summary.component"
import styled from "styled-components"
import { DiskSpaceCategory } from "App/files-manager/components/files-manager/files-manager.interface"
import { DiskSpaceCategoryType } from "App/files-manager/constants"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

const fakeData: DiskSpaceCategory[] = [
  {
    type: DiskSpaceCategoryType.Music,
    color: "#DFEFDE",
    icon: IconType.MuditaLogo,
    label: "Music",
    size: 41943040,
  },
  {
    type: DiskSpaceCategoryType.Free,
    color: "#F4F5F6",
    icon: IconType.Cloud,
    label: "Free",
    size: 62914560,
  },
]

const Container = styled.div`
  width: 98.5rem;
`

export default {
  title: "Views|Files Manager/Files Summary",
}

export const _FilesSummary = () => {
  return (
    <Container>
      <FilesSummary
        usedMemory={62914560}
        totalMemorySpace={104857600}
        diskSpaceCategories={fakeData}
      />
    </Container>
  )
}

_FilesSummary.story = {
  name: "FilesSummary",
}
