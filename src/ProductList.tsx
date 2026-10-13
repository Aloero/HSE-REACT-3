import { memo, useReducer, useCallback, useMemo } from "react";
import type { Products, State, Item, Action } from "./types";

export function useCart() : { totalCount: number, totalPrice: number, onAdd: (product: Item) => void, onRemove: (product: Item) => void, onClear: () => void, cart: State } {
    const initialCart = { items: [] };

    function cartReducer(state: State, action: Action) : State {
        switch (action.type) {
            case "add": {
                const idx: number = state.items.findIndex(item => item.id == action.item.id);
                if (idx == -1) {
                    return { items: [...state.items, { ...action.item, qty: 1 }]}
                }
                return { items: [...state.items.slice(0, idx), ...state.items.slice(idx + 1), { ...state.items[idx], qty: state.items[idx].qty + 1 }]}
            }
            case "remove": {
                const idx: number = state.items.findIndex(item => item.id == action.item.id);
                if (idx == -1) {
                    return state;
                }
                return { items: state.items.filter((item) => item.id !== action.item.id)}
            }
            case "clear":
                return initialCart;
            default:
                return state;
        }
    }

    const [cart, dispatch] = useReducer(cartReducer, initialCart);

    const onAdd = useCallback(
        (product: Item) => dispatch({ type: "add", item: product }), []
    )

    const onRemove = useCallback(
        (product: Item) => dispatch({ type: "remove", item: product }), []
    )

    const onClear = useCallback(
        () => dispatch({ type: "clear" }), []
    )

    const totalCount = useMemo(() => {
        return cart.items.reduce((acc, item) => acc + item.qty, 0);
    }, [cart])

    const totalPrice = useMemo(() => {
        return cart.items.reduce((acc, item) => acc + item.price * item.qty, 0);
    }, [cart])

    return { cart, totalCount, totalPrice, onAdd, onRemove, onClear };
}

const ProductCard = memo(function ProductCard({ id, title, price, inStock, onAdd, onRemove, qtyinCart }: {id: number, title: string, price: number, inStock: boolean, onAdd: (product: Item) => void, onRemove: (product: Item) => void, qtyinCart: number }) {
    const inCart: boolean = qtyinCart > 0;
    console.log("render", id);
    return (
        <>
            <div className="ProductCard">
                <span className="text">{title}</span>
                <span className="text">{price} руб.</span>
                <span className={`text ${inStock ? 'textyes' : 'textno'}`}>{inStock ? "В наличии" : "Нет в наличии"}</span>
                {inStock ? (
                    inCart ? (
                    <div className="wrap_button">
                        <button className="button" onClick={() => onAdd({ id: id, price: price, qty: +1 })}>{`В корзине: ${qtyinCart}`}</button>
                        <button className="button" onClick={() => onRemove({ id: id, price: price, qty: -1 })}>Убрать</button>
                    </div>
                ) : (
                    <button className="button" onClick={() => onAdd({ id: id, price: price, qty: +1 })}>В корзину</button>
                )
                ) : null}
            </div>
        </>
    );
});

export default function ProductList({ products, onAdd, onRemove, cart }: {products: Products, onAdd: (product: Item) => void, onRemove: (product: Item) => void, cart: State }) {
    const qtyById = useMemo(() => 
        Object.fromEntries(cart.items.map(i => [i.id, i.qty])), [cart]
    );

    return (
        <>
            <div className="ProductList">
                {products.map((product) => (
                    <ProductCard key={product.id} {...product} onAdd={onAdd} onRemove={onRemove} qtyinCart={qtyById[product.id] ?? 0}/>
                ))}
            </div>
        </>
    );
}