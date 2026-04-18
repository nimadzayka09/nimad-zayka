import React, { createContext, useContext, useMemo, useReducer } from "react";

const CartContext = createContext(null);

const initial = { items: [], open: false };

function reducer(state, action) {
    switch (action.type) {
        case "OPEN":
            return { ...state, open: true };
        case "CLOSE":
            return { ...state, open: false };
        case "ADD": {
            const key = `${action.item.product_slug}__${action.item.weight}`;
            const existing = state.items.find(
                (i) => `${i.product_slug}__${i.weight}` === key,
            );
            const items = existing
                ? state.items.map((i) =>
                      `${i.product_slug}__${i.weight}` === key
                          ? { ...i, quantity: i.quantity + action.item.quantity }
                          : i,
                  )
                : [...state.items, action.item];
            return { ...state, items, open: true };
        }
        case "UPDATE_QTY": {
            const items = state.items
                .map((i) =>
                    `${i.product_slug}__${i.weight}` === action.key
                        ? { ...i, quantity: Math.max(1, action.quantity) }
                        : i,
                );
            return { ...state, items };
        }
        case "REMOVE": {
            const items = state.items.filter(
                (i) => `${i.product_slug}__${i.weight}` !== action.key,
            );
            return { ...state, items };
        }
        case "CLEAR":
            return { ...state, items: [] };
        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initial);

    const value = useMemo(() => {
        const count = state.items.reduce((s, i) => s + i.quantity, 0);
        const subtotal = state.items.reduce(
            (s, i) => s + i.quantity * i.price,
            0,
        );
        return {
            ...state,
            count,
            subtotal,
            openCart: () => dispatch({ type: "OPEN" }),
            closeCart: () => dispatch({ type: "CLOSE" }),
            addItem: (item) => dispatch({ type: "ADD", item }),
            updateQty: (key, quantity) =>
                dispatch({ type: "UPDATE_QTY", key, quantity }),
            removeItem: (key) => dispatch({ type: "REMOVE", key }),
            clear: () => dispatch({ type: "CLEAR" }),
        };
    }, [state]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}
