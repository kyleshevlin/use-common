import { renderHook } from '@testing-library/react-hooks'
import usePrevious from '../src/usePrevious'

describe('usePrevious', () => {
  it('should be undefined on first pass', () => {
    const { result } = renderHook(() => usePrevious(true))

    expect(result.current).toEqual(undefined)
  })

  it('should return the previous value', () => {
    const { rerender, result } = renderHook(
      ({ value }: { value: any }) => usePrevious(value),
      { initialProps: { value: true } }
    )

    rerender({ value: false })

    expect(result.current).toEqual(true)
  })
})
