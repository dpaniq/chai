export function booleanString(val: string | boolean | null) {
  return typeof val === "string" ? val.toLowerCase() === "true" : Boolean(val);
}
