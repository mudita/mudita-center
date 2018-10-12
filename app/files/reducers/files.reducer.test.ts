import {  } from '../actions/files.actions'
import { getInitialState, reducer } from './files.reducer'

it('should start with empty path', () => {
  expect(getInitialState().currentFolder).toBe('')
})

it('should start with empty file paths', () => {
  expect(getInitialState().filePaths).toBe([])
})

it('should return the state on unrecognized actions', () => {
  const state = getInitialState()
  expect(reducer(state, {type: 'SOME_RANDOM_UNKNOWN'} as any)).toBe(state)
})

it('should set current path to given', () => {
  const state = getInitialState()
  const expectedState = {...getInitialState(), count: 1}
  expect(reducer(state, incrementNetworkCount())).toEqual(expectedState)
})

it('should decrement the count', () => {
  const state = {...getInitialState(), count: 1}
  const expectedState = {...getInitialState(), count: 0}
  expect(reducer(state, decrementNetworkCount())).toEqual(expectedState)
})

it('should not decrement below 0', () => {
  expect(reducer(getInitialState(), decrementNetworkCount())).toEqual(getInitialState())
})
