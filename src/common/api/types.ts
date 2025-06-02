export type ParamType = string | number | boolean | Date | undefined | null | string[];

export interface QueryParams extends Record<string, ParamType> {
    [key: string]: ParamType;
}
