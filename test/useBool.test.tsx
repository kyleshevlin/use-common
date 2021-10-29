import { act, renderHook } from '@testing-library/react-hooks'
import useBool from '../src/useBool'
import {
  getStateFromResult as getState,
  getHandlersFromResult as getHandlers,
} from './utils'

describe('useBool', () => {
  it('should default to false with no argument', () => {
    const { result } = renderHook(() => useBool())

    expect(getState(result)).toEqual(false)
  })

  it('should initialize with true if passed true', () => {
    const { result } = renderHook(() => useBool(true))

    expect(getState(result)).toEqual(true)
  })

  it('should throw an error if initialState is passed something other than a boolean', () => {
    // @ts-ignore testing error from wrong type
    const { result } = renderHook(() => useBool('string'))

    expect(result.error).toEqual(
      Error('`initialState` argument must be a boolean')
    )
  })

  it('should return false when off is fired', () => {
    const { result } = renderHook(() => useBool(true))

    act(() => {
      getHandlers(result).off()
    })

    expect(getState(result)).toEqual(false)
  })

  it('should return true when on is fired', () => {
    const { result } = renderHook(() => useBool())

    act(() => {
      getHandlers(result).on()
    })

    expect(getState(result)).toEqual(true)
  })

  it('should toggle state when toggle is fired', () => {
    const { result } = renderHook(() => useBool())

    act(() => {
      getHandlers(result).toggle()
    })

    expect(getState(result)).toEqual(true)
  })

  it('should reset to initialState when reset is fired', () => {
    const { result } = renderHook(() => useBool(true))

    act(() => {
      getHandlers(result).off()
    })

    act(() => {
      getHandlers(result).reset()
    })

    expect(getState(result)).toEqual(true)
  })
})
