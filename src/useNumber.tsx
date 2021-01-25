import React from 'react'

type Updater = number | ((currentState: number) => number)

type Handlers = {
  update: (updater: Updater) => void
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
      update: (updater: Updater) => {
        setState(updater)
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
