export function ProductCard({ id, title, price, inStock }) {
    return (
        <>
            <div className="ProductCard">
                <span className="text">{title}</span>
                <span className="text">{price} руб.</span>
                <span className={`text ${inStock ? 'textyes' : 'textno'}`}>{inStock ? "В наличии" : "Нет в наличии"}</span>
                <button className="button">В корзину</button>
            </div>
        </>
    );
}

export default function ProductList({ products }) {
    return (
        <>
            <div className="ProductList">
                {products.map((product) => (
                    ProductCard(product)
                ))}
            </div>
        </>
    );
}