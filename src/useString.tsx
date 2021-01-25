import React from 'react'

type Updater = string | ((currentState: string) => string)

type Handlers = {
  update: (updater: Updater) => void
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
      update: (updater: Updater) => {
        setState(updater)
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
