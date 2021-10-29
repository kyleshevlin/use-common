import React from 'react'

type Handlers = {
  off: () => void
  on: () => void
  reset: () => void
  toggle: () => void
}

export default function useBool(
  initialState: boolean = false
): [boolean, Handlers] {
  if (typeof initialState !== 'boolean') {
    throw new Error('`initialState` argument must be a boolean')
  }

  const [state, setState] = React.useState<boolean>(initialState)

  const handlers = React.useMemo(
    () => ({
      on: () => {
        setState(true)
      },
      off: () => {
        setState(false)
      },
      reset: () => {
        setState(initialState)
      },
      toggle: () => {
        setState(s => !s)
      },
    }),
    [initialState]
  )

  return [state, handlers]
}
