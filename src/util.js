export function toConstant (name) {
  return name
  .replace(/[A-Z]/g, c => '_' + c.toUpperCase())
  .replace(/[a-z]/g, c => c.toUpperCase())
}

export function fail (message) {
  throw new Error(`redux-elm-plugin: ${message}`)
}