export const objEqualWithJson = <T>(a: T, b: T): boolean => JSON.stringify(a) === JSON.stringify(b);

export const objEqualWithEcxeptions = <T>(a: T, b: T, exceptFields: ReadonlyArray<string> = []): boolean =>
  Object.keys(a as { [key: string]: any })
    .filter((key) => exceptFields.findIndex((ef) => ef === key) === -1)
    .findIndex((key) => (a as { [key: string]: any })[key] !== (b as { [key: string]: any })[key]) === -1;
