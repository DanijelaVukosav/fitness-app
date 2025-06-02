type Primitive = string | number | boolean | null | undefined;
type DateSerializable = Date | Primitive;
type SerializableValue = DateSerializable | SerializableObject | SerializableArray;
type SerializableObject = { [key: string]: SerializableValue };
type SerializableArray = SerializableValue[];

type SerializedValue = Primitive | SerializedObject | SerializedArray;
type SerializedObject = { [key: string]: SerializedValue };
type SerializedArray = SerializedValue[];

type SerializeDates<T> = T extends Date
    ? string
    : T extends (infer U)[]
      ? SerializeDates<U>[]
      : T extends object
        ? { [K in keyof T]: SerializeDates<T[K]> }
        : T;

type DeserializeDates<T, TDateFields extends string> = T extends object
    ? {
          [K in keyof T]: K extends TDateFields
              ? T[K] extends string
                  ? Date
                  : T[K]
              : T[K] extends (infer U)[]
                ? DeserializeDates<U, TDateFields>[]
                : T[K] extends object
                  ? DeserializeDates<T[K], TDateFields>
                  : T[K];
      }
    : T;

export function serializeDate<T extends SerializableValue>(obj: T): SerializeDates<T> {
    if (obj === null || obj === undefined) {
        return obj as SerializeDates<T>;
    }

    if (obj instanceof Date) {
        return obj.toISOString() as SerializeDates<T>;
    }

    if (Array.isArray(obj)) {
        return obj.map(serializeDate) as SerializeDates<T>;
    }

    if (typeof obj === 'object') {
        const serialized: Record<string, SerializedValue> = {};
        Object.entries(obj).forEach(([key, value]) => {
            serialized[key] = serializeDate(value as SerializableValue);
        });
        return serialized as SerializeDates<T>;
    }

    return obj as SerializeDates<T>;
}

export function deserializeDate<
    T extends Record<string, unknown>,
    TDateFields extends string = never
>(obj: T, dateFields: TDateFields[] = []): DeserializeDates<T, TDateFields> {
    if (obj === null || obj === undefined) {
        return obj as DeserializeDates<T, TDateFields>;
    }

    if (Array.isArray(obj)) {
        return obj.map((item) =>
            typeof item === 'object' && item !== null
                ? deserializeDate(item as Record<string, unknown>, dateFields)
                : item
        ) as unknown as DeserializeDates<T, TDateFields>;
    }

    if (typeof obj === 'object') {
        const deserialized: Record<string, unknown> = {};
        Object.entries(obj).forEach(([key, value]) => {
            if (dateFields.includes(key as TDateFields) && typeof value === 'string') {
                if (isValidISODateString(value)) {
                    deserialized[key] = new Date(value);
                } else {
                    deserialized[key] = value;
                }
            } else if (value !== null && typeof value === 'object') {
                deserialized[key] = deserializeDate(value as Record<string, unknown>, dateFields);
            } else {
                deserialized[key] = value;
            }
        });
        return deserialized as DeserializeDates<T, TDateFields>;
    }

    return obj as DeserializeDates<T, TDateFields>;
}

function isValidISODateString(value: string): boolean {
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
    if (!isoDateRegex.test(value)) {
        return false;
    }

    const date = new Date(value);
    return !isNaN(date.getTime()) && date.toISOString().startsWith(value.substring(0, 19));
}

export function serializeDateFields<T extends Record<string, unknown>>(
    obj: T,
    dateFields: (keyof T)[]
): T {
    if (!obj || typeof obj !== 'object') return obj;

    const result = { ...obj };
    dateFields.forEach((field) => {
        const value = result[field];
        if (value instanceof Date) {
            (result as Record<keyof T, unknown>)[field] = value.toISOString();
        }
    });

    return result;
}

export function deserializeDateFields<
    T extends Record<string, unknown>,
    TDateFields extends keyof T
>(
    obj: T,
    dateFields: TDateFields[]
): T & { [K in TDateFields]: T[K] extends string ? Date : T[K] } {
    if (!obj || typeof obj !== 'object') return obj;

    const result = { ...obj };
    dateFields.forEach((field) => {
        const value = result[field];
        if (typeof value === 'string' && isValidISODateString(value)) {
            (result as Record<TDateFields, unknown>)[field] = new Date(value);
        }
    });

    return result as T & { [K in TDateFields]: T[K] extends string ? Date : T[K] };
}

export class DateTransformer {
    static serialize<T extends SerializableValue>(data: T): SerializeDates<T> {
        return serializeDate(data);
    }

    static deserialize<T extends Record<string, unknown>, TDateFields extends string>(
        data: T,
        dateFields: TDateFields[]
    ): DeserializeDates<T, TDateFields> {
        return deserializeDate(data, dateFields);
    }

    static serializeFields<T extends Record<string, unknown>>(data: T, dateFields: (keyof T)[]): T {
        return serializeDateFields(data, dateFields);
    }

    static deserializeFields<T extends Record<string, unknown>, TDateFields extends keyof T>(
        data: T,
        dateFields: TDateFields[]
    ): T & { [K in TDateFields]: T[K] extends string ? Date : T[K] } {
        return deserializeDateFields(data, dateFields);
    }
}
