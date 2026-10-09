export default function Header({ count, sum, setClear }) {
    return (
        <>
            <div className="header">
                <span className="text">Магазин</span>
                <span className="text2">Корзина: {count} шт. {sum} руб.</span>
                <button className="button" onClick={() => setClear((x) => !x)}>Отчистить</button>
            </div>
        </>
    );
}