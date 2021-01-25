import { act, renderHook } from '@testing-library/react-hooks'
import useCounter from '../src/useCounter'
import {
  getStateFromResult as getState,
  getHandlersFromResult as getHandlers,
} from './utils'

describe('useCounter', () => {
  it('should be 0 if no argument is passed in', () => {
    const { result } = renderHook(() => useCounter())

    expect(getState(result)).toEqual(0)
  })

  it('should use the initialState when passed in', () => {
    const { result } = renderHook(() => useCounter(7))

    expect(getState(result)).toEqual(7)
  })

  it('should throw an error if initialState is passed something other than a number', () => {
    // @ts-ignore testing error from wrong type
    const { result } = renderHook(() => useCounter(true))

    expect(result.error).toEqual(
      Error('`initialState` argument must be a number')
    )
  })

  it('should throw an error if step is passed something other than a number', () => {
    // @ts-ignore testing error from wrong type
    const { result } = renderHook(() => useCounter(0, true))

    expect(result.error).toEqual(Error('`step` argument must be a number'))
  })

  describe('should increment by step when inc is fired', () => {
    test('default step of 1', () => {
      const { result } = renderHook(() => useCounter())

      act(() => {
        getHandlers(result).inc()
      })

      expect(getState(result)).toEqual(1)
    })

    test('provided step argument', () => {
      const { result } = renderHook(() => useCounter(0, 3))

      act(() => {
        getHandlers(result).inc()
      })

      expect(getState(result)).toEqual(3)
    })
  })

  describe('should decrement by step when dec is fired', () => {
    test('default step of 1', () => {
      const { result } = renderHook(() => useCounter())

      act(() => {
        getHandlers(result).dec()
      })

      expect(getState(result)).toEqual(-1)
    })

    test('provided step argument', () => {
      const { result } = renderHook(() => useCounter(0, 3))

      act(() => {
        getHandlers(result).dec()
      })

      expect(getState(result)).toEqual(-3)
    })
  })

  it('should reset to initialState when reset is fired', () => {
    const { result } = renderHook(() => useCounter(7))

    act(() => {
      getHandlers(result).inc()
    })

    act(() => {
      getHandlers(result).reset()
    })

    expect(getState(result)).toEqual(7)
  })

  it('should return a 0 when zero is fired', () => {
    const { result } = renderHook(() => useCounter(7))

    act(() => {
      getHandlers(result).zero()
    })

    expect(getState(result)).toEqual(0)
  })
})
