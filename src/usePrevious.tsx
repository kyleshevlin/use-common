import React from 'react'

export default function usePrevious<T>(value: T): T | undefined {
  const ref = React.useRef<T | undefined>()

  React.useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
