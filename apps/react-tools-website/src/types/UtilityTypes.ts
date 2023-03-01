export type Prefix<K, T extends string> = K extends string ? `${T}${K}` : K;
