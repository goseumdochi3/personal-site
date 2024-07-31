const enumValuesToArray = (enumObject: Record<string, string>) => {
  return Object.values(enumObject) as [string, ...string[]]
}

export { enumValuesToArray }
