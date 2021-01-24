type Result = {
  current: [any, any]
}

export function getStateFromResult(result: Result) {
  return result.current[0]
}

export function getHandlersFromResult(result: Result) {
  return result.current[1]
}
