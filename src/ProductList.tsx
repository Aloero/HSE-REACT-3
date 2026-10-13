import type { Action, Products, State } from "./types";

export function ProductCard({ id, title, price, inStock, dispatch, qtyinCart }: {id: number, title: string, price: number, inStock: Boolean, dispatch: (action: Action) => void, qtyinCart: number }) {
    const inCart: Boolean = qtyinCart > 0;
    return (
        <>
            <div className="ProductCard">
                <span className="text">{title}</span>
                <span className="text">{price} руб.</span>
                <span className={`text ${inStock ? 'textyes' : 'textno'}`}>{inStock ? "В наличии" : "Нет в наличии"}</span>
                {inStock ? (
                    inCart ? (
                    <div className="wrap_button">
                        <button className="button" onClick={() => dispatch({ type: "add", item: { id: id, price: price, qty: +1 }})}>{`В корзине: ${qtyinCart}`}</button>
                        <button className="button" onClick={() => dispatch({ type: "remove", item: { id: id, price: price, qty: -1 }})}>Убрать</button>
                    </div>
                ) : (
                    <button className="button" onClick={() => dispatch({ type: "add", item: { id: id, price: price, qty: +1 }})}>В корзину</button>
                )
                ) : null}
            </div>
        </>
    );
}

export default function ProductList({ products, dispatch, cart }: {products: Products, dispatch: (action: Action) => void, cart: State }) {
    const array_incard = Array(products.length).fill(0);
    cart.items.forEach(element => {
        array_incard[element.id] = element.qty;
    });


    return (
        <>
            <div className="ProductList">
                {products.map((product) => (
                    ProductCard({...product, dispatch, qtyinCart: array_incard[product.id]})
                ))}
            </div>
        </>
    );
}