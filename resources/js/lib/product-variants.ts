/**
 * Product variant options: 5, 10, or 20 bags.
 * Prices are tax-exclusive (税抜). Subscription is 20% off normal.
 */
export const PURCHASE_QUANTITIES = [5, 10, 20] as const;
export type PurchaseQuantity = (typeof PURCHASE_QUANTITIES)[number];

export function isPurchaseQuantity(n: number): n is PurchaseQuantity {
    return PURCHASE_QUANTITIES.includes(n as PurchaseQuantity);
}

export type ProductVariant = {
    quantity: PurchaseQuantity;
    label: string;
    subscription: { total: number; perBag: number };
    normal: { total: number; perBag: number };
};

export const PRODUCT_VARIANTS: Record<PurchaseQuantity, ProductVariant> = {
    5: {
        quantity: 5,
        label: '天空隊長 5袋セット',
        subscription: { total: 1520, perBag: 304 },
        normal: { total: 1900, perBag: 380 },
    },
    10: {
        quantity: 10,
        label: '天空隊長 10袋セット',
        subscription: { total: 3040, perBag: 304 },
        normal: { total: 3800, perBag: 380 },
    },
    20: {
        quantity: 20,
        label: '天空隊長 20袋セット',
        subscription: { total: 5120, perBag: 256 },
        normal: { total: 6400, perBag: 320 },
    },
};

export function getVariant(quantity: number): ProductVariant {
    const q = isPurchaseQuantity(quantity) ? quantity : 5;
    return PRODUCT_VARIANTS[q];
}

export function formatYen(n: number): string {
    return n.toLocaleString('ja-JP');
}
