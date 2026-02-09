/**
 * Client-side cart store (localStorage).
 * Each item: bag set size (quantity), mode (subscription/normal), count (sets).
 */
const CART_STORAGE_KEY = 'sky-captain-cart';

export type CartMode = 'subscription' | 'normal';

export type CartItemStored = {
    id: string;
    quantity: 5 | 10 | 20;
    mode: CartMode;
    count: number;
};

function generateId(): string {
    return `cart-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function getCart(): CartItemStored[] {
    if (typeof window === 'undefined') return [];
    try {
        const raw = window.localStorage.getItem(CART_STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw) as unknown;
        if (!Array.isArray(parsed)) return [];
        return parsed.filter(
            (item): item is CartItemStored =>
                item &&
                typeof item === 'object' &&
                typeof item.id === 'string' &&
                [5, 10, 20].includes(Number(item.quantity)) &&
                (item.mode === 'subscription' || item.mode === 'normal') &&
                typeof item.count === 'number' &&
                item.count >= 1,
        );
    } catch {
        return [];
    }
}

export function addToCart(item: Omit<CartItemStored, 'id'>): CartItemStored {
    const entry: CartItemStored = {
        ...item,
        id: generateId(),
        quantity: item.quantity as 5 | 10 | 20,
        count: Math.max(1, Math.floor(item.count)),
    };
    const cart = getCart();
    cart.push(entry);
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
    return entry;
}

export function removeFromCart(id: string): void {
    const cart = getCart().filter((item) => item.id !== id);
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
}

/** Clear all items from the cart (e.g. after completing a buy-all purchase). */
export function clearCart(): void {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([]));
    }
}
