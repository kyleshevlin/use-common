# use-common

Just some common custom React hooks so I don't have to keep writing them over and over.

- `useBool`
- `useCounter`
- `useNumber`
- `usePrevious`
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
  const [isOpen, { toggle }] = useBool()

  return (
    <button type="button" onClick={toggle}>
      {String(isOpen)}
    </button>
  )
}
```

## Philosophy

By creating a library of small hooks with defined state handlers, I can quickly compose more complex custom hooks through composition. For example, I can make a `useTextInput` hook with the following composition:

```javascript
function useTextInput(initialState = '') {
  const [state, handlers] = useString(initialState)
  const handleChange = React.useCallback(e => {
    handlers.update(e.target.value)
  })

  return [state, { ...handlers, handleChange }]
}

// And in a component
const [value, { handleChange }] = useTextInput()
```

## API

These hooks follow a common pattern of returning a tuple of `state` and `handlers` for that state. When composing functionality with these hooks, rename the `state` to what a name that works best for your use case with array destructuring, and rename the individual `handlers` with object destructuring assignment.

### `useBool`

This hook manages a `Boolean` state.

**Arguments**

| Argument       | Type      | Default | Description                   |
| -------------- | --------- | ------- | ----------------------------- |
| `initialState` | `boolean` | `false` | The initial state of the hook |

**Handlers**

| Name     | Type         | Description                            |
| -------- | ------------ | -------------------------------------- |
| `off`    | `() => void` | Sets the `state` to `false`            |
| `on`     | `() => void` | Sets the `state` to `true`             |
| `reset`  | `() => void` | Sets the `state` to the `initialState` |
| `toggle` | `() => void` | Flips the `state`                      |

### `useString`

This hook manages a `String` state and ensures it remains a `String`.

**Arguments**

| Argument       | Type     | Default | Description                   |
| -------------- | -------- | ------- | ----------------------------- |
| `initialState` | `string` | `''`    | The initial state of the hook |

**Handlers**

| Name     | Type                                          | Description                             |
| -------- | --------------------------------------------- | --------------------------------------- |
| `update` | `string | ((currentState: string) => string)` | Updates the `state` to the new `string` |
| `reset`  | `() => void`                                  | Sets the `state` to the `initialState`  |
| `empty`  | `() => void`                                  | Sets the state to an empty string       |

### `useNumber`

This hook manages a `Number` state and ensures it remains a `Number`.

**Arguments**

| Argument       | Type     | Default | Description                   |
| -------------- | -------- | ------- | ----------------------------- |
| `initialState` | `number` | `0`     | The initial state of the hook |

**Handlers**

| Name     | Type                                          | Description                             |
| -------- | --------------------------------------------- | --------------------------------------- |
| `update` | `number | ((currentState: number) => number)` | Updates the `state` to the new `number` |
| `reset`  | `() => void`                                  | Sets the `state` to the `initialState`  |
| `zero`   | `() => void`                                  | Sets the state to `0`                   |

### `useCounter`

This hook builds a counter on top of `useNumber`.

**Arguments**

| Argument       | Type     | Default | Description                                               |
| -------------- | -------- | ------- | --------------------------------------------------------- |
| `initialState` | `number` | `0`     | The initial state of the hook                             |
| `step`         | `number` | `1`     | The amount of change used by the `inc` and `dec` handlers |

**Handlers**

| Name    | Type         | Description                            |
| ------- | ------------ | -------------------------------------- |
| `inc`   | `() => void` | Increases the `state` by the `step`    |
| `dec`   | `() => void` | Decreases the `state` by the `step`    |
| `reset` | `() => void` | Sets the `state` to the `initialState` |
| `zero`  | `() => void` | Sets the state to `0`                  |

### `usePrevious`

This hook manages a value's previous state. It returns the value from the previous render.

**Arguments**

| Argument | Type | Description                   |
| -------- | ---- | ----------------------------- |
| `value`  | `T`  | The value the hook will track |
