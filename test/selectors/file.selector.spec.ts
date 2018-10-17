import {expect} from "chai";
import { currentPath, selectFiles, selectFilesState } from '../../app/files/selectors/file.selector'

describe('file selector', () => {
  it('should select the files state', () => {
    expect(selectFilesState({files: 'files state'} as any)).deep.eq('files state')
  })

  describe('when filePaths exists', () => {
    it('should select the filePaths', () => {
      expect(selectFiles({files: {filePaths: []}} as any)).deep.eq([])
    })
  })

  describe('when currentPath exists', () => {
    it('should select the should select currentFolder', () => {
      expect(currentPath({files: {currentFolder: './'}} as any)).deep.eq('./')
    })
  })

})
