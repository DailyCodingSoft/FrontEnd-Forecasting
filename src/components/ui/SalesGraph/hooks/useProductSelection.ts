import { useEffect, useState } from "react";

export interface ProductSelection {
    selected: Set<string>;
    toggle: (name: string) => void;
    selectAll: () => void;
    clearAll: () => void;
}

export function useProductSelection(allProducts: string[]): ProductSelection {
    const [selected, setSelected] = useState<Set<string>>(() => new Set(allProducts));

    // Reconcile selection when the available product list changes.
    // Keeps existing picks, auto-adds new ones, drops vanished ones, enforces min-1.
    useEffect(() => {
        setSelected((prev) => {
            const allSet = new Set(allProducts);
            const next = new Set<string>();

            for (const p of prev) if (allSet.has(p)) next.add(p);
            for (const p of allProducts) if (!prev.has(p)) next.add(p);
            if (next.size === 0 && allProducts.length > 0) next.add(allProducts[0]);

            if (
                next.size === prev.size &&
                [...next].every((p) => prev.has(p))
            ) {
                return prev;
            }
            return next;
        });
    }, [allProducts]);

    return {
        selected,
        toggle: (name) =>
            setSelected((prev) => {
                const next = new Set(prev);
                if (next.has(name)) {
                    if (next.size === 1) return prev;
                    next.delete(name);
                } else {
                    next.add(name);
                }
                return next;
            }),
        selectAll: () => setSelected(new Set(allProducts)),
        clearAll: () =>
            setSelected(
                allProducts.length > 0 ? new Set([allProducts[0]]) : new Set()
            ),
    };
}
