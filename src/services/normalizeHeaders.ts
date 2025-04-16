import { IHeaders } from "kafkajs";

// Utility to convert Record<string, unknown> to IHeaders
export function normalizeHeaders(headers?: Record<string, unknown>): IHeaders | undefined {
    if (!headers) return undefined;

    const normalized: IHeaders = {};
    for (const key of Object.keys(headers)) {
        const value = headers[key];
        if (typeof value === 'string' || Buffer.isBuffer(value)) {
            normalized[key] = value;
        } else if (value !== undefined && value !== null) {
            normalized[key] = Buffer.from(JSON.stringify(value));
        } else {
            normalized[key] = undefined;
        };
    };
    return normalized;
};
