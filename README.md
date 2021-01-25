# use-common

Just some common custom React hooks so I don't have to keep writing them over and over.

- `useBool`
- `useNumber`
- `useString`

More to come.

## Getting started

Install the package:

```
npm install --save @kyleshevlin/use-common
```

And use the hooks

```jsx
import { useBool } from '@kyleshevlin/use-common'

function Toggle() {
  const [state, { toggle }] = useBool()

  return (
    <button type="button" onClick={toggle}>
      {String(state)}
    </button>
  )
}
```

## API

Documentation to come.
