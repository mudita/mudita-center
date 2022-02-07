/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import * as React from "react"
import FilesSummary from "App/files-manager/components/files-summary/files-summary.component"
import styled from "styled-components"
import { DiskSpaceCategory } from "App/files-manager/components/files-manager/files-manager.interface"
import { Type } from "Renderer/components/core/icon/icon.config"
import { DiskSpaceCategoryType } from "App/files-manager/constants"

const fakeData: DiskSpaceCategory[] = [
  {
    type: DiskSpaceCategoryType.UsedSpace,
    color: "#DFEFDE",
    icon: Type.MuditaLogo,
    label: "Used space",
    size: 41943040,
  },
  {
    type: DiskSpaceCategoryType.Free,
    color: "#F4F5F6",
    icon: Type.Cloud,
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
          systemMemory={62914560}
          totalMemorySpace={104857600}
          diskSpaceCategories={fakeData}
        />
      </Container>
    )
  }
)
