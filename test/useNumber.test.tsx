import { act, renderHook } from '@testing-library/react-hooks'
import useNumber from '../src/useNumber'
import {
  getStateFromResult as getState,
  getHandlersFromResult as getHandlers,
} from './utils'

describe('useNumber', () => {
  it('should be 0 if no argument is passed in', () => {
    const { result } = renderHook(() => useNumber())

    expect(getState(result)).toEqual(0)
  })

  it('should use the initialState when passed in', () => {
    const { result } = renderHook(() => useNumber(7))

    expect(getState(result)).toEqual(7)
  })

  it('should throw an error if initialState is passed something other than a number', () => {
    // @ts-ignore testing error from wrong type
    const { result } = renderHook(() => useNumber(true))

    expect(result.error).toEqual(
      Error('`initialState` argument must be a number')
    )
  })

  it('should update when update is fired', () => {
    const { result } = renderHook(() => useNumber())

    act(() => {
      getHandlers(result).update(7)
    })

    expect(getState(result)).toEqual(7)
  })

  it('should reset to initialState when reset is fired', () => {
    const { result } = renderHook(() => useNumber(7))

    act(() => {
      getHandlers(result).update(10)
    })

    act(() => {
      getHandlers(result).reset()
    })

    expect(getState(result)).toEqual(7)
  })

  it('should return a 0 when zero is fired', () => {
    const { result } = renderHook(() => useNumber(7))

    act(() => {
      getHandlers(result).zero()
    })

    expect(getState(result)).toEqual(0)
  })
})
