export type CamelCase<S extends string> =
  S extends `${infer Head}-${infer Tail}`
    ? `${Lowercase<Head>}${Capitalize<CamelCase<Tail>>}`
    : S;

export type KebabCase<S extends string> = S extends `${infer Head}${infer Tail}`
  ? Tail extends Uncapitalize<Tail>
    ? `${Lowercase<Head>}${KebabCase<Tail>}`
    : `${Lowercase<Head>}-${KebabCase<Tail>}`
  : S;

export type SnakeCase<S extends string> = S extends `${infer Head}${infer Tail}`
  ? Tail extends Uncapitalize<Tail>
    ? `${Lowercase<Head>}${SnakeCase<Tail>}`
    : `${Lowercase<Head>}_${SnakeCase<Tail>}`
  : S;

export type PascalCase<S extends string> =
  S extends `${infer Head}-${infer Tail}`
    ? `${Capitalize<Lowercase<Head>>}${PascalCase<Tail>}`
    : Capitalize<Lowercase<S>>;

type CaseType = 'pascal' | 'kebab' | 'snake' | 'camel' | undefined;

export const isCamelCase = (value: string): boolean =>
  /^[a-z]+(?:[A-Z][a-z]+)*$/.test(value);

export const isKebabCase = (value: string): boolean =>
  /^[a-z]+(?:-[a-z]+)*$/.test(value);

export const isPascalCase = (value: string): boolean =>
  /^[A-Z][a-z]*(?:[A-Z][a-z]*)*$/.test(value);

export const isSnakeCase = (value: string): boolean =>
  /^[a-z]+(?:_[a-z]+)*$/.test(value);

export const detectCase = (value: string): CaseType => {
  if (/^[A-Z][a-zA-Z]*$/.test(value)) {
    return 'pascal';
  } else if (/^[a-z][a-z-]*[a-z]$/.test(value)) {
    return 'kebab';
  } else if (/^[a-z][a-z_]*[a-z]$/.test(value)) {
    return 'snake';
  } else if (/^[a-z][a-zA-Z]*$/.test(value)) {
    return 'camel';
  } else {
    return undefined;
  }
};

export const toCamelCase = <T extends string>(
  value: T
): CamelCase<T> | undefined | string => {
  if (typeof value !== 'string') return undefined;
  const caseType = detectCase(value);
  switch (caseType) {
    case 'pascal':
      return (value.charAt(0).toLowerCase() + value.slice(1)) as CamelCase<T>;
    case 'kebab':
      return value.replace(/-([a-z])/g, (_, c) =>
        c.toUpperCase()
      ) as CamelCase<T>;
    case 'snake':
      return value.replace(/_([a-z])/g, (_, c) =>
        c.toUpperCase()
      ) as CamelCase<T>;
    default:
      return value;
  }
};

export const toKebabCase = <T extends string>(
  value: T
): KebabCase<T> | string | undefined => {
  if (typeof value !== 'string') return undefined;
  const caseType = detectCase(value);
  switch (caseType) {
    case 'pascal':
      //   return value.replace(/([A-Z])/g, '-$1').toLowerCase() as KebabCase<T>;
      return value
        .replace(/([A-Z])/g, '-$1')
        .slice(1)
        .toLowerCase() as KebabCase<T>;
    case 'snake':
      return value.replace(/_/g, '-') as KebabCase<T>;
    case 'camel':
      return value
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase() as KebabCase<T>;
    default:
      return value;
  }
};

export const toSnakeCase = <T extends string>(
  value: T
): SnakeCase<T> | string | undefined => {
  if (typeof value !== 'string') return undefined;
  const caseType = detectCase(value);
  switch (caseType) {
    case 'pascal':
      return value
        .replace(/([A-Z])/g, '_$1')
        .slice(1)
        .toLowerCase() as SnakeCase<T>;
    case 'kebab':
      return value.replace(/-/g, '_') as SnakeCase<T>;
    case 'camel':
      return value
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .toLowerCase() as SnakeCase<T>;
    default:
      return value;
  }
};

export const toPascalCase = <T extends string>(
  value: T
): PascalCase<T> | undefined | string => {
  if (typeof value !== 'string') return undefined;
  const caseType = detectCase(value);
  switch (caseType) {
    case 'kebab':
      return value
        .replace(/-([a-z])/g, (_, c) => c.toUpperCase())
        .replace(/^\w/, (c) => c.toUpperCase()) as PascalCase<T>;
    case 'snake':
      return value
        .replace(/_([a-z])/g, (_, c) => c.toUpperCase())
        .replace(/^\w/, (c) => c.toUpperCase()) as PascalCase<T>;
    case 'camel':
      return (value.charAt(0).toUpperCase() + value.slice(1)) as PascalCase<T>;
    default:
      return value;
  }
};
