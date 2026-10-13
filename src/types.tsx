export type Item = {
    id: number,
    price: number,
    qty: number
}

export type Action = 
    | { type: "add"; item: Item }
    | { type: "remove"; item: Item }
    | { type: "clear" }

export type State = { items: Item[] };

export type Products = Product[];

export type Product = {
    id: number;
    title: string;
    price: number;
    inStock: boolean;
}