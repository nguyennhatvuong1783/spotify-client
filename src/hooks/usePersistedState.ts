"use client";

import { useState, useEffect } from "react";

export function usePersistedState<T>(
    key: string,
    defaultValue: T,
): [T, (value: T) => void] {
    const [state, setState] = useState<T>(() => {
        try {
            const savedValue = localStorage.getItem(key);
            return savedValue ? JSON.parse(savedValue) : defaultValue;
        } catch (error) {
            return defaultValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}
