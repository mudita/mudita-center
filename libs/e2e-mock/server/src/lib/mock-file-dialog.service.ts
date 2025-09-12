/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export class MockFileDialog {
  private mockFilePaths: string[] = []

  setMockFilePaths(paths: string[]) {
    this.mockFilePaths = paths
  }

  getMockFilePaths(): string[] {
    return this.mockFilePaths
  }

  getMockDirectoryPath(): string {
    return this.mockFilePaths[0]
  }

  clearMockFilePaths() {
    this.mockFilePaths = []
  }
}

export const mockFileDialog = new MockFileDialog()
