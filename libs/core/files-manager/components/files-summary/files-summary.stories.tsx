/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import * as React from "react"
import FilesSummary from "Core/files-manager/components/files-summary/files-summary.component"
import styled from "styled-components"
import { DiskSpaceCategory } from "Core/files-manager/components/files-manager-core/files-manager.interface"
import { DiskSpaceCategoryType } from "Core/files-manager/constants"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"

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

storiesOf("Views|Files Manager/Files Summary", module).add(
  "FilesSummary",
  () => {
    return (
      <Container>
        <FilesSummary
          usedMemory={62914560}
          totalMemorySpace={104857600}
          diskSpaceCategories={fakeData}
          summaryTitleMessage={{ id: "component.filesManagerSummaryTitle" }}
        />
      </Container>
    )
  }
)
