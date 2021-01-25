import { act, renderHook } from '@testing-library/react-hooks'
import useString from '../src/useString'
import {
  getStateFromResult as getState,
  getHandlersFromResult as getHandlers,
} from './utils'

describe('useString', () => {
  it('should be an empty string if no argument is passed in', () => {
    const { result } = renderHook(() => useString())

    expect(getState(result)).toEqual('')
  })

  it('should use the initialState when passed in', () => {
    const { result } = renderHook(() => useString('hello'))

    expect(getState(result)).toEqual('hello')
  })

  it('should throw an error if initialState is passed something other than a string', () => {
    // @ts-ignore testing error from wrong type
    const { result } = renderHook(() => useString(true))

    expect(result.error).toEqual(
      Error('`initialState` argument must be a string')
    )
  })

  it('should update when update is fired', () => {
    const { result } = renderHook(() => useString())

    act(() => {
      getHandlers(result).update('hello')
    })

    expect(getState(result)).toEqual('hello')

    act(() => {
      getHandlers(result).update((str: string) => str + ' world')
    })

    expect(getState(result)).toEqual('hello world')
  })

  it('should reset to initialState when reset is fired', () => {
    const { result } = renderHook(() => useString('hello'))

    act(() => {
      getHandlers(result).update('world')
    })

    act(() => {
      getHandlers(result).reset()
    })

    expect(getState(result)).toEqual('hello')
  })

  it('should return an empty string when empty is fired', () => {
    const { result } = renderHook(() => useString('hello'))

    act(() => {
      getHandlers(result).empty()
    })

    expect(getState(result)).toEqual('')
  })
})
