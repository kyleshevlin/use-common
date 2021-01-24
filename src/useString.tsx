import React from 'react'

type Handlers = {
  update: (value: string) => void
  reset: () => void
  empty: () => void
}

export default function useString(
  initialState: string = ''
): [string, Handlers] {
  if (typeof initialState !== 'string') {
    throw new Error('`initialState` argument must be a string')
  }

  const [state, setState] = React.useState<string>(initialState)

  const handlers = React.useMemo(
    () => ({
      update: (value: string) => {
        setState(value)
      },
      reset: () => {
        setState(initialState)
      },
      empty: () => {
        setState('')
      },
    }),
    [initialState]
  )

  return [state, handlers]
}
