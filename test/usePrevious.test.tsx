import { renderHook } from '@testing-library/react-hooks'
import usePrevious from '../src/usePrevious'

describe('usePrevious', () => {
  it('should be undefined on first pass', () => {
    const { result } = renderHook(() => usePrevious(true))

    expect(result.current).toEqual(undefined)
  })

  it('should return the previous value', () => {
    const callback = ({ value }: { value: any }) => usePrevious(value)
    const options = { initialProps: { value: true } }
    const { rerender, result } = renderHook(callback, options)

    rerender({ value: false })

    expect(result.current).toEqual(true)
  })
})
