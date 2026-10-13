import { memo } from "react";
import type { Products, State, Item } from "./types";

const ProductCard = memo(function ProductCard({ id, title, price, inStock, onAdd, onRemove, qtyinCart }: {id: number, title: string, price: number, inStock: Boolean, onAdd: (product: Item) => void, onRemove: (product: Item) => void, qtyinCart: number }) {
    const inCart: Boolean = qtyinCart > 0;
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
    const array_incard = Array(products.length).fill(0);
    cart.items.forEach(element => {
        array_incard[element.id] = element.qty;
    });

    return (
        <>
            <div className="ProductList">
                {products.map((product) => (
                    <ProductCard key={product.id} {...product} onAdd={onAdd} onRemove={onRemove} qtyinCart={array_incard[product.id]}/>
                ))}
            </div>
        </>
    );
}