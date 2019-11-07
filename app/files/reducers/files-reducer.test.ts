import {expect} from "chai"
import {setCurrentPath} from '../actions/files.actions'
import {getInitialState, reducer} from './files.reducer'

test('starts with empty path', () => {
  expect(getInitialState().currentFolder).eq('')
})

test('starts with empty file paths', () => {
  expect(getInitialState().filePaths).deep.eq([])
})

test('returns the state on unrecognized actions', () => {
  const state = getInitialState()
  expect(reducer(state, {type: 'SOME_RANDOM_UNKNOWN'} as any)).eq(state)
})

test('sets current path to given', () => {
  const state = getInitialState()
  const expectedState = {...getInitialState(), currentFolder: 'currentPath'}
  expect(reducer(state, setCurrentPath('currentPath'))).deep.eq(expectedState)
})
