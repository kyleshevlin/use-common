import React from 'react'

type Handlers = {
  setTrue: () => void
  setFalse: () => void
  toggle: () => void
  reset: () => void
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
      setTrue: () => {
        setState(true)
      },
      setFalse: () => {
        setState(false)
      },
      toggle: () => {
        setState(s => !s)
      },
      reset: () => {
        setState(initialState)
      },
    }),
    [initialState]
  )

  return [state, handlers]
}
