import React from 'react'
import useNumber from './useNumber'

type Handlers = {
  inc: () => void
  dec: () => void
  reset: () => void
  zero: () => void
}

export default function useCounter(
  initialState: number = 0,
  step: number = 1
): [number, Handlers] {
  if (typeof initialState !== 'number') {
    throw new Error('`initialState` argument must be a number')
  }

  if (typeof step !== 'number') {
    throw new Error('`step` argument must be a number')
  }

  const [state, { update, reset, zero }] = useNumber(initialState)

  const handlers = React.useMemo(
    () => ({
      inc: () => {
        update(n => n + step)
      },
      dec: () => {
        update(n => n - step)
      },
      reset,
      zero,
    }),
    [reset, step, update, zero]
  )

  return [state, handlers]
}
