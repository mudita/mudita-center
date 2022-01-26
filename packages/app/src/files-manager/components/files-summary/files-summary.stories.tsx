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
import { FileType } from "App/files-manager/constants"

const fakeData: DiskSpaceCategory[] = [
  {
    fileType: FileType.UsedSpace,
    color: "#DFEFDE",
    icon: Type.MuditaLogo,
    megabyteSize: 1024,
  },
  {
    fileType: FileType.Free,
    color: "#F4F5F6",
    icon: Type.Cloud,
    megabyteSize: 124,
  },
]

const memorySpace = {
  free: 60,
  full: 100,
}

const Container = styled.div`
  width: 98.5rem;
`

storiesOf("Views|Files Manager/Files Summary", module).add(
  "FilesSummary",
  () => {
    return (
      <Container>
        <FilesSummary memorySpace={memorySpace} data={fakeData} />
      </Container>
    )
  }
)
