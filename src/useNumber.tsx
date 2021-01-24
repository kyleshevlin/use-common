import React from 'react'

type Handlers = {
  update: (number: number) => void
  reset: () => void
  zero: () => void
}

export default function useNumber(
  initialState: number = 0
): [number, Handlers] {
  if (typeof initialState !== 'number') {
    throw new Error('`initialState` argument must be a number')
  }

  const [state, setState] = React.useState<number>(initialState)

  const handlers = React.useMemo(
    () => ({
      update: (number: number) => {
        setState(number)
      },
      reset: () => {
        setState(initialState)
      },
      zero: () => {
        setState(0)
      },
    }),
    [initialState]
  )

  return [state, handlers]
}
